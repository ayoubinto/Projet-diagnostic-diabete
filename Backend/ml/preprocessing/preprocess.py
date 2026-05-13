import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder

#Load Data
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
file_path = os.path.join(BASE_DIR, 'dataset', 'diabetes_prediction_dataset.csv')
df = pd.read_csv(file_path)

#Exploratory Data Analysis (EDA)
"""print(df.head())
print(df.describe())
print(df.info())
print(df.shape)
print(df.isnull().sum())"""

#Feature-Target Separation
df = df[df['gender'] != "Other"]
X = df.drop('diabetes', axis=1)
Y = df['diabetes']

#Data Cleaning
"""
for i in X.columns:
    print("Column name : ",i,"Count : ",X[i].nunique())
    print("Unique Value : ",X[i].unique())
    print("\n")
X = X[X['age'] >= 18]
for i in X.columns:
    if i == "age":
        print("Column name : ",i,"Count : ",X[i].nunique())
        print("Unique Value : ",X[i].unique())
"""
print(len(Y))
print(len(X))
#filter_zero = X[X['gender']  =="Other"]
#print(len(filter_zero))

#Feature Engineering
#Encoder gendre
le = LabelEncoder()
X['gender_encoder'] = le.fit_transform(X['gender'])

#Supprimer la colonne gender
X = X.drop('gender',axis=1)

#Encoder smoking_history
X_encoder = pd.get_dummies(X['smoking_history'],dtype=int)
X = pd.concat([X,X_encoder],axis=1)

#Supprimer la colonne smoking_history
X = X.drop('smoking_history',axis=1)
#print(X.head())



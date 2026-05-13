from ..preprocessing.preprocess import X , Y
from sklearn.model_selection import train_test_split,GridSearchCV,StratifiedKFold,RandomizedSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, f1_score, recall_score, precision_score
from xgboost import XGBClassifier
import xgboost as xgb
import joblib
import json

# ==============================
# 1. DATA SPLITTING
# ==============================

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size = 0.2, random_state = 42)

# ==============================
# 2. FEATURE SCALING
# ==============================

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ==============================
# 3. HYPERPARAMETER TUNING
# ==============================

params = {
    'max_depth': [3, 4, 5,6],
    'learning_rate': [0.01, 0.05, 0.1],
    'n_estimators': [100,200,300]
}
"""model = XGBClassifier(eval_metric='logloss')
grid_search = GridSearchCV(scoring = 'recall',estimator=model, param_grid=params, cv=3)
grid_search.fit(X_train, y_train)

print(grid_search.best_params_)"""

# ==============================
# 4. MODELING (TRAINING)/ PREDICTION / EVALUATION
# ==============================

#4.1.1 Modeling Logistic Regression
"""model = LogisticRegression(max_iter = 500)
model.fit(X_train_scaled, y_train)

#4.1.2 Prediction Logistic Regression
y_pred = model.predict(X_test_scaled)

#4.1.3 Model Evaluation Logistic Regression
accuracy = accuracy_score(y_test,y_pred)
f1 = f1_score(y_test,y_pred)
recall = recall_score(y_test,y_pred)
precision = precision_score(y_test,y_pred)

#4.2.1 Modeling Random Forest
model_r = RandomForestClassifier(n_estimators=300, random_state=42)
model_r.fit(X_train,y_train)

#4.2.2 Prediction Random Forest
y_pred_r = model_r.predict(X_test)

#4.2.3 Model Evaluation Random Forest
accuracy_r = accuracy_score(y_test,y_pred_r)
f1_r = f1_score(y_test,y_pred_r)
recall_r = recall_score(y_test,y_pred_r)
precision_r = precision_score(y_test,y_pred_r)

print('Logisitic R')
print(f'Model accuracy : {accuracy:.4f}')
print(f'F1 score : {f1:4f}')
print(f'Recall : {recall:4f}')
print(f'Précision : {precision:4f}')
print('Random Forest')
print(f'Model (Random Forest) accuracy : {accuracy_r:.4f}')
print(f'F1 score (Random Forest): {f1_r:4f}')
print(f'Recall (Random Forest): {recall_r:4f}')
print(f'Précision (Random Forest): {precision_r:4f}')"""

#4.3.1 Model XGBooster
model_x = xgb.XGBClassifier(n_estimators=300,max_depth=6,learning_rate=0.1,random_state=42)
model_x.fit(X_train, y_train)

#Sauvegarder le Model et les colonnes
joblib.dump(model_x, 'ml/models/xgboost_model.pkl')
column_list = list(X.columns)
with open('ml/models/features.json', 'w', encoding='utf-8') as f:
    json.dump(column_list,f)

#4.3.2 Prediction XGBooster
prediction = model_x.predict(X_test)

#4.3.3 Modeling Evaluation XGBooster
accuracy_x = accuracy_score(y_test,prediction)
f1_x = f1_score(y_test,prediction)
recall_x = recall_score(y_test,prediction)
precision_x = precision_score(y_test,prediction)
"""print('XGBoost')
print(f'Model accuracy : {accuracy_x:.4f}')
print(f'F1 score : {f1_x:4f}')
print(f'Recall : {recall_x:4f}')
print(f'Precision : {precision_x:4f}')"""





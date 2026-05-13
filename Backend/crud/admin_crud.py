from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models import Admin
from schemas.validation_mod import AdminCreate



async def get_admin_by_id(db:AsyncSession , admin_id:int) -> Admin | None:
    result = await db.execute(select(Admin).where(Admin.id_adm == admin_id))
    return result.scalar_one_or_none()


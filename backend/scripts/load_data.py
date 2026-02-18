import json
import math
import os

from app.database import SessionLocal
from app.models.recipe import Recipe


# ---------- FILE PATH ----------

# Get absolute path to current file (scripts/load_data.py)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# recipes.json should be inside scripts folder
DATA_PATH = os.path.join(BASE_DIR, "recipes.json")


# ---------- HELPERS ----------

def clean_number(value):
    """
    Convert invalid numbers / NaN → None
    """
    if value is None:
        return None

    try:
        value = float(value)
        if math.isnan(value):
            return None
        return int(value) if value.is_integer() else value
    except Exception:
        return None


def safe_get(item, key, default=None):
    """
    Safe getter to avoid KeyErrors
    """
    return item.get(key, default)


# ---------- MAIN LOADER ----------

def load_data():
    db = SessionLocal()

    try:
        print("📂 Loading data from:", DATA_PATH)

        # Load JSON file
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Handle dict format: {"0": {...}, "1": {...}}
        if isinstance(data, dict):
            data = data.values()

        count = 0

        for item in data:
            if not isinstance(item, dict):
                continue

            recipe = Recipe(
                cuisine=safe_get(item, "cuisine"),
                title=safe_get(item, "title"),
                rating=clean_number(safe_get(item, "rating")),
                prep_time=clean_number(safe_get(item, "prep_time")),
                cook_time=clean_number(safe_get(item, "cook_time")),
                total_time=clean_number(safe_get(item, "total_time")),
                description=safe_get(item, "description"),
                nutrients=safe_get(item, "nutrients"),
                serves=safe_get(item, "serves"),

                # 🔥 important fields
                ingredients=safe_get(item, "ingredients"),
                instructions=safe_get(item, "instructions"),
            )

            db.add(recipe)
            count += 1

            # Batch commit every 100 records
            if count % 100 == 0:
                db.commit()
                print(f"✅ Inserted {count} recipes...")

        db.commit()
        print(f"\n🎉 Done! Inserted total {count} recipes")

    except Exception as e:
        db.rollback()
        print("❌ Error occurred:", e)

    finally:
        db.close()


# ---------- ENTRY ----------

def main():
    load_data()


if __name__ == "__main__":
    main()

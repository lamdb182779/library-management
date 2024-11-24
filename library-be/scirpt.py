import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get database credentials from environment variables
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_name = os.getenv('DB_NAME')

# Connect to the PostgreSQL database
try:
    conn = psycopg2.connect(
        dbname=db_name,
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port
    )
    cursor = conn.cursor()
    print("Kết nối tới PostgreSQL thành công.")
except Exception as e:
    print(f"Không thể kết nối tới PostgreSQL: {e}")
    exit()

# Insert data into existing tables
try:
    # Insert data into the `account` table
    accounts = [
        ('admin', 'admin123', 1, 1),
        ('thuthu', 'thuthu123', 2, 1),
        ('reader', 'reader123', 3, 1)
    ]
    cursor.executemany(
        "INSERT INTO account (username, pw, role, active) VALUES (%s, %s, %s, %s)",
        accounts
    )

    # Insert data into the `admin` table
    admins = [
        (1, 'Admin Name', 'admin', 'admin_image.png'),
    ]
    cursor.executemany(
        "INSERT INTO admin (id, name, username, image) VALUES (%s, %s, %s, %s)",
        admins
    )

    # Insert data into the `thuthu` table
    librarians = [
        (2, 'Thu Thư Name', '1980-01-01', '123 Street', 'thuthu', 'thuthu_image.png', 1),
    ]
    cursor.executemany(
        "INSERT INTO thuthu (id, name, dob, address, username, image, active) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        librarians
    )

    # Insert data into the `faculty` table
    faculties = [
        (1, 'Computer Science'),
        (2, 'Engineering'),
    ]
    cursor.executemany(
        "INSERT INTO faculty (id, name) VALUES (%s, %s)",
        faculties
    )

    # Insert data into the `reader` table
    readers = [
        (3, 'Reader Name', '2000-01-01', '456 Road', 'reader_image.png', 1, 'reader'),
    ]
    cursor.executemany(
        "INSERT INTO reader (id, name, dob, address, image, facultyId, username, active) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        readers
    )

    # Commit changes
    conn.commit()
    print("Dữ liệu đã được chèn thành công.")

except Exception as e:
    print(f"Lỗi khi chèn dữ liệu: {e}")
    conn.rollback()

# Close the connection
finally:
    if conn:
        cursor.close()
        conn.close()
        print("Kết nối tới PostgreSQL đã đóng.")

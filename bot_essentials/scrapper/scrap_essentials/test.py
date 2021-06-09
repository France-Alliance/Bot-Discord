import dotenv
SYSTEM_ENV = dotenv.dotenv_values('../.env')
print(SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"], SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"])
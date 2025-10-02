import html
import re

# Convierte el dato en float
def format_historic_data(data: str) -> float:
    print("######################", data)

    if not data:
        return 0.0

    # Caso especial de "?" que en PRTG suele significar 100%
    if "?" in data:
        data = data.replace("?", "100%")

    # 1. Decodificar entidades HTML (&amp;gt; → >)
    data = html.unescape(data)

    # 2. Quitar espacios en blanco
    data = ''.join(data.split())

    # 3. Eliminar caracteres no numéricos comunes (% y >)
    data = data.replace('%', '').replace('>', '')

    # 4. Cambiar coma por punto decimal
    data = data.replace(',', '.')

    # 5. Usar regex para extraer el número
    match = re.search(r"\d+(\.\d+)?", data)
    if not match:
        print("No se encontró un número válido.")
        return 0.0

    try:
        print("Número extraído:", round(float(match.group()), 2))
        return round(float(match.group()), 2)
    except ValueError:
        return 0.0



# # Convierte el dato en float
# def format_historic_data(data):
#     print("######################", data)

#     if "?" in data:
#         data = data.replace("?", "100%")
#     data = ''.join(data.split())
#     data = data.replace('%', '')
#     data = data.replace(',', '.')
#     data = round(float(data), 2)
#     return data
import streamlit as st
import os

# Ruta al archivo HTML generado por React
html_path = os.path.join("build", "index.html")

# Leer el archivo HTML y mostrarlo en Streamlit
with open(html_path, "r") as f:
    html_content = f.read()

# Usar Streamlit para renderizar el HTML de React
st.components.v1.html(html_content, height=600)

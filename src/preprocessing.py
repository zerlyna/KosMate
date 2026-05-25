import pandas as pd

# =========================
# MAPPING
# =========================

mapping_ada = {
    "Ada": 1,
    "Tidak": 0
}

mapping_listrik = {
    "Include": 1,
    "Exclude": 0
}

mapping_km = {
    "Dalam": 1,
    "Luar": 0
}

# =========================
# PREPROCESS INPUT
# =========================

def preprocess_input(data):

    input_user = pd.DataFrame({
        "Jarak dari PENS": [data["jarak"]],
        "Jenis": [data["jenis"]],
        "WiFi": [data["wifi"]],
        "AC": [data["ac"]],
        "Dapur": [data["dapur"]],
        "Listrik": [data["listrik"]],
        "Kamar mandi": [data["kamar_mandi"]]
    })

    input_user["WiFi"] = input_user["WiFi"].map(mapping_ada)
    input_user["AC"] = input_user["AC"].map(mapping_ada)
    input_user["Dapur"] = input_user["Dapur"].map(mapping_ada)
    input_user["Listrik"] = input_user["Listrik"].map(mapping_listrik)
    input_user["Kamar mandi"] = input_user["Kamar mandi"].map(mapping_km)

    input_user["Skor_Fasilitas"] = (
        input_user["WiFi"] +
        input_user["AC"] +
        input_user["Dapur"] +
        input_user["Kamar mandi"]
    )

    input_user = pd.get_dummies(
        input_user,
        columns=["Jenis"]
    )

    fitur_regresi = [
        "Jarak dari PENS",
        "WiFi",
        "AC",
        "Dapur",
        "Listrik",
        "Kamar mandi",
        "Skor_Fasilitas",
        "Jenis_Campur",
        "Jenis_Khusus Laki Laki",
        "Jenis_Khusus Perempuan"
    ]

    input_user = input_user.reindex(
        columns=fitur_regresi,
        fill_value=0
    )

    return input_user
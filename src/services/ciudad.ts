export async function buscarCiudad(codigoPostal: string) {
    const ciudadInput = document.getElementById("ciudad") as HTMLInputElement;
    let ciudad = "CP ERRONEO"; // valor por defecto si hay error

    if (!codigoPostal) {
        if (ciudadInput) ciudadInput.value = ciudad;
        ciudad="";
       
    }else{

    try {
        const response = await fetch(`https://api.zippopotam.us/ES/${codigoPostal}`);

        if (!response.ok) {
            console.error("No se encontró la ciudad");
        } else {
            const data = await response.json();
            if (data.places && data.places.length > 0 && data.places[0]["place name"]) {
                ciudad = data.places[0]["place name"];
            } else {
                console.error("No hay información de la ciudad en la respuesta");
            }
        }
    } catch (error) {
        console.error("Error al buscar la ciudad:", error);
    }

}
    // Rellenar siempre el input, incluso si hubo error
    if (ciudadInput) ciudadInput.value = ciudad;
    return ciudad;
}

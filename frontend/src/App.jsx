import React, { useState } from 'react';

function App() {
  // Estado inicial simulando una base de datos de donaciones
  const [donaciones, setDonaciones] = useState([
    { id: 1, producto: "Tomates Orgánicos", cantidad: "15 Kg", estado: "Disponible", tipo: "Frutas/Verduras" },
    { id: 2, producto: "Pan Artesanal", cantidad: "20 Unidades", estado: "Entregado", tipo: "Panadería" },
    { id: 3, producto: "Lácteos Varios", cantidad: "10 Litros", estado: "Disponible", tipo: "Lácteos" }
  ]);

  // Estados para el formulario de registro
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [tipo, setTipo] = useState('Frutas/Verduras');

  // Función para manejar el envío del formulario (Lógica de inserción)
  const handleRegistrar = (e) => {
    e.preventDefault();
    if (!producto || !cantidad) return alert("Por favor completa los campos");

    const nuevaDonacion = {
      id: Date.now(),
      producto,
      cantidad,
      tipo,
      estado: "Disponible"
    };

    setDonaciones([nuevaDonacion, ...donaciones]);
    setProducto('');
    setCantidad('');
  };

  // Función para simular cambio de estado (Simula un "Update" en la BD)
  const cambiarEstado = (id) => {
    setDonaciones(donaciones.map(don => 
      don.id === id ? { ...don, estado: don.estado === "Disponible" ? "Entregado" : "Disponible" } : don
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">🍲 FoodRescue Hub</h1>
          <span className="bg-emerald-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">MVP Panel</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulario (Rol: Donante / Restaurante o Tienda) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold mb-4 text-emerald-700">Registrar Excedente</h2>
          <form onSubmit={handleRegistrar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Nombre del Alimento</label>
              <input 
                type="text" 
                value={producto} 
                onChange={(e) => setProducto(e.target.value)}
                placeholder="Ej. Manzanas rojas" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Cantidad / Peso</label>
              <input 
                type="text" 
                value={cantidad} 
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Ej. 10 Kg, 5 Bolsas" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Categoría</label>
              <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option>Frutas/Verduras</option>
                <option>Panadería</option>
                <option>Lácteos</option>
                <option>Abarrotes</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition-colors shadow-sm">
              Publicar Donación
            </button>
          </form>
        </div>

        {/* Panel de visualización (Rol: Fundación / Banco de Alimentos) */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-gray-700 flex justify-between items-center">
            <span>Donaciones en Tiempo Real</span>
            <span className="text-xs font-normal text-gray-500">Total: {donaciones.length} items</span>
          </h2>

          <div className="space-y-3">
            {donaciones.map((don) => (
              <div key={don.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 flex justify-between items-center hover:shadow-sm transition-shadow">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">{don.producto}</h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-medium">{don.tipo}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Cantidad disponible: <span className="font-medium text-gray-700">{don.cantidad}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${don.estado === 'Disponible' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                    {don.estado}
                  </span>
                  <button 
                    onClick={() => cambiarEstado(don.id)} 
                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 px-3 rounded-md transition-colors"
                  >
                    {don.estado === 'Disponible' ? 'Marcar Entregado' : 'Reabrir'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

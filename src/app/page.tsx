'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Regiones de Chile
const REGIONES = [
  { id: 'arica', nombre: 'Arica y Parinacota', codigo: 'XV' },
  { id: 'tarapaca', nombre: 'Tarapaca', codigo: 'I' },
  { id: 'antofagasta', nombre: 'Antofagasta', codigo: 'II' },
  { id: 'atacama', nombre: 'Atacama', codigo: 'III' },
  { id: 'coquimbo', nombre: 'Coquimbo', codigo: 'IV' },
  { id: 'valparaiso', nombre: 'Valparaiso', codigo: 'V' },
  { id: 'metropolitana', nombre: 'Metropolitana', codigo: 'RM' },
  { id: 'ohiggins', nombre: "O'Higgins", codigo: 'VI' },
  { id: 'maule', nombre: 'Maule', codigo: 'VII' },
  { id: 'nuble', nombre: 'Nuble', codigo: 'XVI' },
  { id: 'biobio', nombre: 'Biobio', codigo: 'VIII' },
  { id: 'araucania', nombre: 'La Araucania', codigo: 'IX' },
  { id: 'rios', nombre: 'Los Rios', codigo: 'XIV' },
  { id: 'lagos', nombre: 'Los Lagos', codigo: 'X' },
  { id: 'aysen', nombre: 'Aysen', codigo: 'XI' },
  { id: 'magallanes', nombre: 'Magallanes', codigo: 'XII' }
];

// Fiscalías por región (datos de ejemplo)
const FISCALIAS = [
  // Metropolitana
  { id: 1, nombre: 'Fiscalia Regional Metropolitana Centro Norte', region: 'metropolitana', tipo: 'regional', direccion: 'General Mackenna 1369, Santiago', telefono: '(2) 2965 9000', comunas: ['Santiago', 'Independencia', 'Recoleta', 'Conchali', 'Huechuraba', 'Quilicura'] },
  { id: 2, nombre: 'Fiscalia Regional Metropolitana Oriente', region: 'metropolitana', tipo: 'regional', direccion: 'Eliodoro Yanez 1925, Providencia', telefono: '(2) 2965 9100', comunas: ['Providencia', 'Las Condes', 'Vitacura', 'Lo Barnechea', 'Nunoa', 'La Reina'] },
  { id: 3, nombre: 'Fiscalia Regional Metropolitana Sur', region: 'metropolitana', tipo: 'regional', direccion: 'San Francisco 1677, Santiago', telefono: '(2) 2965 9200', comunas: ['San Miguel', 'La Cisterna', 'El Bosque', 'La Pintana', 'San Ramon', 'Puente Alto'] },
  { id: 4, nombre: 'Fiscalia Regional Metropolitana Occidente', region: 'metropolitana', tipo: 'regional', direccion: 'Compania 1312, Santiago', telefono: '(2) 2965 9300', comunas: ['Cerro Navia', 'Lo Prado', 'Pudahuel', 'Quinta Normal', 'Renca', 'Maipu'] },
  { id: 5, nombre: 'Fiscalia Local de Puente Alto', region: 'metropolitana', tipo: 'local', direccion: 'Concha y Toro 461, Puente Alto', telefono: '(2) 2965 9400', comunas: ['Puente Alto', 'La Florida', 'Pirque', 'San Jose de Maipo'] },
  { id: 6, nombre: 'Fiscalia Local de Maipu', region: 'metropolitana', tipo: 'local', direccion: 'Av. Pajaritos 3195, Maipu', telefono: '(2) 2965 9450', comunas: ['Maipu', 'Cerrillos', 'Padre Hurtado'] },

  // Valparaiso
  { id: 7, nombre: 'Fiscalia Regional de Valparaiso', region: 'valparaiso', tipo: 'regional', direccion: 'Blanco 1111, Valparaiso', telefono: '(32) 232 5000', comunas: ['Valparaiso', 'Vina del Mar', 'Concon', 'Quintero', 'Puchuncavi'] },
  { id: 8, nombre: 'Fiscalia Local de Vina del Mar', region: 'valparaiso', tipo: 'local', direccion: 'Arlegui 646, Vina del Mar', telefono: '(32) 232 5100', comunas: ['Vina del Mar', 'Concon', 'Reñaca'] },
  { id: 9, nombre: 'Fiscalia Local de San Antonio', region: 'valparaiso', tipo: 'local', direccion: 'Av. Barros Luco 2566, San Antonio', telefono: '(35) 220 6000', comunas: ['San Antonio', 'Cartagena', 'El Tabo', 'El Quisco', 'Algarrobo'] },

  // Biobio
  { id: 10, nombre: 'Fiscalia Regional del Biobio', region: 'biobio', tipo: 'regional', direccion: 'Castellon 399, Concepcion', telefono: '(41) 286 5000', comunas: ['Concepcion', 'Talcahuano', 'Hualpen', 'San Pedro de la Paz'] },
  { id: 11, nombre: 'Fiscalia Local de Concepcion', region: 'biobio', tipo: 'local', direccion: 'Tucapel 346, Concepcion', telefono: '(41) 286 5100', comunas: ['Concepcion', 'Chiguayante', 'Hualqui'] },
  { id: 12, nombre: 'Fiscalia Local de Los Angeles', region: 'biobio', tipo: 'local', direccion: 'Caupolican 501, Los Angeles', telefono: '(43) 232 1000', comunas: ['Los Angeles', 'Nacimiento', 'Mulchen', 'Negrete'] },

  // Araucania
  { id: 13, nombre: 'Fiscalia Regional de La Araucania', region: 'araucania', tipo: 'regional', direccion: 'Bulnes 531, Temuco', telefono: '(45) 229 7000', comunas: ['Temuco', 'Padre Las Casas', 'Freire', 'Pitrufquen'] },
  { id: 14, nombre: 'Fiscalia Local de Temuco', region: 'araucania', tipo: 'local', direccion: 'Vicuna Mackenna 650, Temuco', telefono: '(45) 229 7100', comunas: ['Temuco', 'Padre Las Casas'] },

  // Coquimbo
  { id: 15, nombre: 'Fiscalia Regional de Coquimbo', region: 'coquimbo', tipo: 'regional', direccion: 'Arturo Prat 450, La Serena', telefono: '(51) 220 4000', comunas: ['La Serena', 'Coquimbo', 'Ovalle', 'Vicuna'] },
  { id: 16, nombre: 'Fiscalia Local de La Serena', region: 'coquimbo', tipo: 'local', direccion: 'Cordovez 281, La Serena', telefono: '(51) 220 4100', comunas: ['La Serena', 'Coquimbo', 'La Higuera'] },

  // Antofagasta
  { id: 17, nombre: 'Fiscalia Regional de Antofagasta', region: 'antofagasta', tipo: 'regional', direccion: 'San Martin 2536, Antofagasta', telefono: '(55) 265 2000', comunas: ['Antofagasta', 'Mejillones', 'Taltal'] },
  { id: 18, nombre: 'Fiscalia Local de Calama', region: 'antofagasta', tipo: 'local', direccion: 'Ramirez 2101, Calama', telefono: '(55) 265 2500', comunas: ['Calama', 'San Pedro de Atacama', 'Ollague'] },

  // Lagos
  { id: 19, nombre: 'Fiscalia Regional de Los Lagos', region: 'lagos', tipo: 'regional', direccion: 'Urmeneta 509, Puerto Montt', telefono: '(65) 226 2000', comunas: ['Puerto Montt', 'Puerto Varas', 'Llanquihue', 'Fresia'] },
  { id: 20, nombre: 'Fiscalia Local de Osorno', region: 'lagos', tipo: 'local', direccion: 'Manuel Rodriguez 1054, Osorno', telefono: '(64) 223 3000', comunas: ['Osorno', 'Rio Negro', 'Purranque', 'Puyehue'] }
];

// Estructura del Ministerio Público
const ESTRUCTURA = [
  {
    nivel: 1,
    nombre: 'Fiscal Nacional',
    descripcion: 'Maximo jefe del Ministerio Publico. Dirige la institucion y fija politicas de persecucion penal.',
    icon: '👨‍⚖️',
    actual: 'Angel Valencia Vasquez'
  },
  {
    nivel: 2,
    nombre: 'Fiscales Regionales',
    descripcion: '19 fiscales regionales que dirigen la persecucion penal en cada region.',
    icon: '⚖️',
    cantidad: '19'
  },
  {
    nivel: 3,
    nombre: 'Fiscales Adjuntos',
    descripcion: 'Fiscales que investigan y ejercen la accion penal en las fiscalias locales.',
    icon: '📋',
    cantidad: '+700'
  }
];

// Tipos de delitos
const DELITOS = [
  { categoria: 'Contra las personas', ejemplos: ['Homicidio', 'Lesiones', 'Secuestro', 'Amenazas'], icon: '👤' },
  { categoria: 'Contra la propiedad', ejemplos: ['Robo', 'Hurto', 'Estafa', 'Apropiacion indebida'], icon: '🏠' },
  { categoria: 'Sexuales', ejemplos: ['Violacion', 'Abuso sexual', 'Pornografia infantil'], icon: '⚠️' },
  { categoria: 'Economicos', ejemplos: ['Lavado de activos', 'Cohecho', 'Fraude al fisco'], icon: '💰' },
  { categoria: 'Drogas', ejemplos: ['Trafico', 'Microtrafico', 'Cultivo'], icon: '💊' },
  { categoria: 'VIF', ejemplos: ['Maltrato habitual', 'Lesiones VIF', 'Amenazas VIF'], icon: '🏠' }
];

// Derechos de las victimas
const DERECHOS_VICTIMA = [
  { derecho: 'Ser tratada con dignidad', descripcion: 'Recibir un trato digno y respetuoso por parte de fiscales y funcionarios' },
  { derecho: 'Denunciar el delito', descripcion: 'Presentar denuncia ante fiscalia, carabineros o PDI' },
  { derecho: 'Ser informada', descripcion: 'Conocer el estado de la investigacion y las resoluciones' },
  { derecho: 'Solicitar proteccion', descripcion: 'Pedir medidas de proteccion para si misma y su familia' },
  { derecho: 'Participar en el proceso', descripcion: 'Presentar querella y ser parte del juicio' },
  { derecho: 'Recibir reparacion', descripcion: 'Solicitar indemnizacion por los danos sufridos' },
  { derecho: 'Ser escuchada', descripcion: 'Que su opinion sea considerada antes de decisiones importantes' },
  { derecho: 'Asistencia gratuita', descripcion: 'Acceder a orientacion juridica sin costo' }
];

type Vista = 'buscar' | 'estructura' | 'denuncia' | 'victimas';

interface Fiscalia {
  id: number;
  nombre: string;
  region: string;
  tipo: string;
  direccion: string;
  telefono: string;
  comunas: string[];
}

export default function MinisterioPublico() {
  const [vista, setVista] = useState<Vista>('buscar');
  const [regionSeleccionada, setRegionSeleccionada] = useState<string>('');
  const [busquedaComuna, setBusquedaComuna] = useState('');
  const [tipoFiscalia, setTipoFiscalia] = useState<'todas' | 'regional' | 'local'>('todas');
  const [fiscaliaSeleccionada, setFiscaliaSeleccionada] = useState<Fiscalia | null>(null);

  const fiscaliasFiltradas = FISCALIAS.filter(f => {
    if (regionSeleccionada && f.region !== regionSeleccionada) return false;
    if (tipoFiscalia !== 'todas' && f.tipo !== tipoFiscalia) return false;
    if (busquedaComuna) {
      const busqueda = busquedaComuna.toLowerCase();
      const coincideComuna = f.comunas.some(c => c.toLowerCase().includes(busqueda));
      const coincideNombre = f.nombre.toLowerCase().includes(busqueda);
      if (!coincideComuna && !coincideNombre) return false;
    }
    return true;
  });

  const renderBuscador = () => (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🔍</span> Buscar Fiscalia
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {/* Región */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Region</label>
            <select
              value={regionSeleccionada}
              onChange={(e) => setRegionSeleccionada(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="" className="bg-slate-800">Todas las regiones</option>
              {REGIONES.map(r => (
                <option key={r.id} value={r.id} className="bg-slate-800">
                  {r.codigo} - {r.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Tipo de Fiscalia</label>
            <select
              value={tipoFiscalia}
              onChange={(e) => setTipoFiscalia(e.target.value as 'todas' | 'regional' | 'local')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="todas" className="bg-slate-800">Todas</option>
              <option value="regional" className="bg-slate-800">Fiscalia Regional</option>
              <option value="local" className="bg-slate-800">Fiscalia Local</option>
            </select>
          </div>

          {/* Búsqueda por comuna */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Comuna o nombre</label>
            <input
              type="text"
              value={busquedaComuna}
              onChange={(e) => setBusquedaComuna(e.target.value)}
              placeholder="Ej: Providencia, Temuco..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <p className="text-sm text-gray-400">
          {fiscaliasFiltradas.length} fiscalia(s) encontrada(s)
        </p>
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        {fiscaliasFiltradas.map((fiscalia, index) => (
          <motion.div
            key={fiscalia.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setFiscaliaSeleccionada(fiscalia)}
            className={`bg-white/10 backdrop-blur rounded-xl p-4 border cursor-pointer transition-all hover:bg-white/15 ${
              fiscaliaSeleccionada?.id === fiscalia.id
                ? 'border-red-500 ring-2 ring-red-500/50'
                : 'border-white/20'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  fiscalia.tipo === 'regional'
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {fiscalia.tipo === 'regional' ? '🏛️ Regional' : '📍 Local'}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                {REGIONES.find(r => r.id === fiscalia.region)?.nombre}
              </span>
            </div>

            <h4 className="text-white font-bold mb-2">{fiscalia.nombre}</h4>

            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gray-500">📍</span>
                <span className="text-gray-300">{fiscalia.direccion}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-500">📞</span>
                <span className="text-gray-300">{fiscalia.telefono}</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {fiscalia.comunas.slice(0, 4).map(comuna => (
                <span key={comuna} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
                  {comuna}
                </span>
              ))}
              {fiscalia.comunas.length > 4 && (
                <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
                  +{fiscalia.comunas.length - 4} mas
                </span>
              )}
            </div>
          </motion.div>
        ))}

        {fiscaliasFiltradas.length === 0 && (
          <div className="bg-white/5 rounded-xl p-8 text-center">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-gray-400">No se encontraron fiscalias con los filtros seleccionados</p>
          </div>
        )}
      </div>

      {/* Detalle fiscalía seleccionada */}
      <AnimatePresence>
        {fiscaliaSeleccionada && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-2xl p-6 border border-red-500/30"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{fiscaliaSeleccionada.nombre}</h3>
              <button
                onClick={() => setFiscaliaSeleccionada(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-sm text-gray-400 mb-2">Direccion</h4>
                  <p className="text-white">{fiscaliaSeleccionada.direccion}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-sm text-gray-400 mb-2">Telefono</h4>
                  <p className="text-white font-mono text-lg">{fiscaliaSeleccionada.telefono}</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-sm text-gray-400 mb-2">Comunas que atiende</h4>
                <div className="flex flex-wrap gap-2">
                  {fiscaliaSeleccionada.comunas.map(comuna => (
                    <span key={comuna} className="px-3 py-1 bg-red-500/20 rounded-full text-sm text-red-200">
                      {comuna}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-200 text-sm flex items-start gap-2">
                <span>💡</span>
                <span>
                  <strong>Fono Denuncia:</strong> Llama al <strong>600 333 0000</strong> para denunciar delitos las 24 horas.
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderEstructura = () => (
    <div className="space-y-6">
      {/* Estructura jerárquica */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🏛️</span> Estructura del Ministerio Publico
        </h3>

        <div className="space-y-4">
          {ESTRUCTURA.map((nivel, i) => (
            <motion.div
              key={nivel.nivel}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${
                nivel.nivel === 1 ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30' :
                nivel.nivel === 2 ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30' :
                'bg-white/10 border-white/20'
              }`}
              style={{ marginLeft: `${(nivel.nivel - 1) * 20}px` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{nivel.icon}</span>
                <div>
                  <h4 className="text-white font-bold">{nivel.nombre}</h4>
                  <p className="text-sm text-gray-400">
                    {nivel.actual || `${nivel.cantidad} en todo Chile`}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{nivel.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tipos de delitos */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📋</span> Tipos de Delitos que Investiga
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DELITOS.map((delito, i) => (
            <motion.div
              key={delito.categoria}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{delito.icon}</span>
                <h4 className="text-white font-bold text-sm">{delito.categoria}</h4>
              </div>
              <div className="flex flex-wrap gap-1">
                {delito.ejemplos.map(ej => (
                  <span key={ej} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
                    {ej}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Fiscalias Regionales', valor: '19', icon: '🏛️' },
          { label: 'Fiscalias Locales', valor: '98', icon: '📍' },
          { label: 'Fiscales Adjuntos', valor: '+700', icon: '👨‍⚖️' },
          { label: 'Causas Anuales', valor: '+1.5M', icon: '📋' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-4 text-center border border-red-500/20"
          >
            <span className="text-3xl mb-2 block">{stat.icon}</span>
            <p className="text-2xl font-bold text-white">{stat.valor}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDenuncia = () => (
    <div className="space-y-6">
      {/* Cómo denunciar */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📢</span> Como Hacer una Denuncia
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { paso: '1', titulo: 'Fiscalia', desc: 'Presenta tu denuncia en cualquier fiscalia', icon: '🏛️' },
            { paso: '2', titulo: 'Carabineros', desc: 'En cualquier comisaria de Chile', icon: '👮' },
            { paso: '3', titulo: 'PDI', desc: 'En cualquier cuartel de la PDI', icon: '🔍' },
            { paso: '4', titulo: 'Fono Denuncia', desc: '600 333 0000 las 24 horas', icon: '📞' }
          ].map((item, i) => (
            <motion.div
              key={item.paso}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 rounded-xl p-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
                {item.paso}
              </div>
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <h4 className="text-white font-bold">{item.titulo}</h4>
              <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Qué información llevar */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📝</span> Que Informacion Llevar
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-red-400 font-bold">Datos obligatorios:</h4>
            {[
              'Tu cedula de identidad',
              'Relato de los hechos (que, cuando, donde, como)',
              'Nombre o descripcion del agresor si lo conoces',
              'Lugar donde ocurrieron los hechos'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-red-400">✓</span>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-blue-400 font-bold">Si los tienes:</h4>
            {[
              'Testigos (nombre y telefono)',
              'Fotos o videos del hecho',
              'Documentos relacionados',
              'Certificados medicos (en caso de lesiones)',
              'Boletas o comprobantes (en caso de estafa)'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-400">○</span>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Denuncia online */}
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>💻</span> Denuncia Online
        </h3>
        <p className="text-gray-300 mb-4">
          Puedes hacer denuncias por internet a traves del portal de la Fiscalia:
        </p>
        <a
          href="https://www.fiscaliadechile.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all"
        >
          <span>🌐</span> Ir a fiscaliadechile.cl
        </a>
        <p className="text-sm text-gray-400 mt-3">
          Necesitas ClaveUnica para hacer una denuncia online.
        </p>
      </div>

      {/* Importante */}
      <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
        <h4 className="text-red-300 font-bold mb-2 flex items-center gap-2">
          <span>⚠️</span> Importante
        </h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• La denuncia es <strong>gratuita</strong> y puedes hacerla las 24 horas</li>
          <li>• No necesitas abogado para denunciar</li>
          <li>• Puedes denunciar aunque no seas la victima directa</li>
          <li>• La denuncia falsa es un delito (art. 211 Codigo Penal)</li>
        </ul>
      </div>
    </div>
  );

  const renderVictimas = () => (
    <div className="space-y-6">
      {/* Derechos */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>⚖️</span> Derechos de las Victimas
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {DERECHOS_VICTIMA.map((item, i) => (
            <motion.div
              key={item.derecho}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 rounded-xl p-4"
            >
              <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                <span className="text-green-400">✓</span>
                {item.derecho}
              </h4>
              <p className="text-sm text-gray-400 ml-6">{item.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* URAVIT */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>💜</span> URAVIT - Atencion a Victimas
        </h3>
        <p className="text-gray-300 mb-4">
          Las Unidades Regionales de Atencion a Victimas y Testigos (URAVIT) entregan apoyo integral:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { titulo: 'Orientacion', desc: 'Informacion sobre tus derechos y el proceso', icon: '📋' },
            { titulo: 'Proteccion', desc: 'Medidas de seguridad si estas en riesgo', icon: '🛡️' },
            { titulo: 'Apoyo Psicologico', desc: 'Atencion emocional durante el proceso', icon: '💚' }
          ].map((item) => (
            <div key={item.titulo} className="bg-white/10 rounded-lg p-4 text-center">
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <h4 className="text-white font-bold">{item.titulo}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contacto URAVIT */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📞</span> Contacto de Emergencia
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { nombre: 'Fono Denuncia', numero: '600 333 0000', desc: '24 horas' },
            { nombre: 'Fono Familia', numero: '149', desc: 'Violencia intrafamiliar' },
            { nombre: 'Carabineros', numero: '133', desc: 'Emergencias' },
            { nombre: 'PDI', numero: '134', desc: 'Policia de Investigaciones' }
          ].map((item) => (
            <div key={item.nombre} className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-4 text-center border border-red-500/20">
              <h4 className="text-white font-bold text-sm">{item.nombre}</h4>
              <p className="text-2xl font-bold text-red-400 my-2">{item.numero}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Programas especiales */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🎯</span> Programas Especiales
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { nombre: 'Fiscalia de Alta Complejidad', desc: 'Casos de crimen organizado, narcotrafico mayor, corrupcion', icon: '⚖️' },
            { nombre: 'Fiscalia de Delitos Sexuales', desc: 'Especialistas en delitos contra la indemnidad sexual', icon: '🛡️' },
            { nombre: 'Fiscalia de Violencia de Genero', desc: 'Femicidios, VIF grave, violencia contra mujeres', icon: '💜' },
            { nombre: 'Fiscalia Ambiental', desc: 'Delitos contra el medio ambiente y recursos naturales', icon: '🌿' }
          ].map((programa) => (
            <div key={programa.nombre} className="bg-white/5 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl">{programa.icon}</span>
              <div>
                <h4 className="text-white font-bold">{programa.nombre}</h4>
                <p className="text-sm text-gray-400">{programa.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-6xl mb-4 block">⚖️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ministerio <span className="text-red-400">Publico</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fiscalia de Chile - Persecucion penal y proteccion de victimas
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300">
                🔍 Buscador de Fiscalias
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300">
                📢 Como Denunciar
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300">
                💜 Derechos Victimas
              </span>
            </div>

            <div className="mt-6 p-4 bg-red-500/20 rounded-xl border border-red-500/30 inline-block">
              <p className="text-red-200 font-bold">
                📞 Fono Denuncia: <span className="text-2xl">600 333 0000</span>
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'buscar', label: 'Buscar Fiscalia', icon: '🔍' },
              { id: 'estructura', label: 'Estructura', icon: '🏛️' },
              { id: 'denuncia', label: 'Denunciar', icon: '📢' },
              { id: 'victimas', label: 'Victimas', icon: '💜' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setVista(tab.id as Vista)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  vista === tab.id
                    ? 'bg-red-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={vista}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {vista === 'buscar' && renderBuscador()}
            {vista === 'estructura' && renderEstructura()}
            {vista === 'denuncia' && renderDenuncia()}
            {vista === 'victimas' && renderVictimas()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Ministerio Publico - Modulo de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-red-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Portal educativo. Para denuncias oficiales: fiscaliadechile.cl
          </p>
        </div>
      </footer>
    </div>
  );
}

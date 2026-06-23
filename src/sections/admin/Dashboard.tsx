import { useEffect, useState } from 'react';
import { getOrdenadores } from '@/model/api/main/ordenadores';
import { getProyectos } from '@/model/api/main/proyectos';
import { getFormaciones } from '@/model/api/main/formacion';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ComputerDesktopIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { 
  type ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

const chartData = [
  { month: "Enero", visitas: 186 },
  { month: "Febrero", visitas: 305 },
  { month: "Marzo", visitas: 237 },
  { month: "Abril", visitas: 173 },
  { month: "Mayo", visitas: 209 },
  { month: "Junio", visitas: 314 },
];

const chartConfig = {
  visitas: {
    label: "Visitas",
    color: "#0f172a", 
  },
} satisfies ChartConfig;

const Dashboard = () => {
  const [stats, setStats] = useState({
    equipos: 0,
    valorTotal: 0,
    proyectos: 0,
    formacion: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [equiposData, proyectosData, formacionData] = await Promise.all([
        getOrdenadores(),
        getProyectos(),
        getFormaciones()
      ]);

      const valorCat = equiposData.reduce((acc, pc) => acc + (pc.precio || 0), 0);

      setStats({
        equipos: equiposData.length,
        valorTotal: valorCat,
        proyectos: proyectosData.length,
        formacion: formacionData.length
      });
      
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-2 text-sm">
          Resumen general de tu portfolio y catálogo de equipos.
        </p>
      </div>

      {loading ? (
        <p className="text-slate-500">Calculando estadísticas...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipos en Catálogo</CardTitle>
              <ComputerDesktopIcon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.equipos}</div>
              <p className="text-xs text-slate-500 mt-1">Registrados en Supabase</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor del Catálogo</CardTitle>
              <CurrencyDollarIcon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.valorTotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </div>
              <p className="text-xs text-slate-500 mt-1">Suma total de precios</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyectos Publicados</CardTitle>
              <BriefcaseIcon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.proyectos}</div>
              <p className="text-xs text-slate-500 mt-1">Trabajos en tu portfolio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Titulaciones</CardTitle>
              <AcademicCapIcon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.formacion}</div>
              <p className="text-xs text-slate-500 mt-1">Cursos e historial académico</p>
            </CardContent>
          </Card>

        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Actividad Reciente (Visitas)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="visitas" fill="var(--color-visitas)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Estado del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-4 border border-slate-100 rounded-lg">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-700">Base de datos (Supabase) operativa</span>
              </div>
              <div className="flex items-center p-4 border border-slate-100 rounded-lg">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-700">API de Portfolio online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
import { AdminLayout } from "../components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const stats = [
  {
    title: "Clientes Ativos",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Documentos Processados",
    value: "2,847",
    change: "+8%",
    trend: "up",
    icon: FileText,
    color: "text-green-600"
  },
  {
    title: "Receita Mensal",
    value: "R$ 47.8K",
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600"
  },
  {
    title: "Taxa de Automação",
    value: "94%",
    change: "+3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-600"
  }
];

const recentActivities = [
  {
    id: 1,
    client: "TechStart Ltda",
    action: "Relatório mensal gerado",
    time: "2 min atrás",
    status: "completed",
    icon: CheckCircle
  },
  {
    id: 2,
    client: "Commerce Plus",
    action: "SPED Fiscal processado",
    time: "15 min atrás",
    status: "completed",
    icon: CheckCircle
  },
  {
    id: 3,
    client: "Inovação Digital",
    action: "Processando folha de pagamento",
    time: "1 hora atrás",
    status: "processing",
    icon: Clock
  },
  {
    id: 4,
    client: "StartupTech",
    action: "Pendência em documento fiscal",
    time: "2 horas atrás",
    status: "pending",
    icon: AlertCircle
  }
];

const upcomingTasks = [
  {
    id: 1,
    task: "Entrega DEFIS - 15 empresas",
    deadline: "Hoje, 18:00",
    priority: "high",
    completed: 12,
    total: 15
  },
  {
    id: 2,
    task: "Relatórios gerenciais mensais",
    deadline: "Amanhã, 12:00",
    priority: "medium",
    completed: 8,
    total: 23
  },
  {
    id: 3,
    task: "Backup mensal de dados",
    deadline: "30/09, 23:59",
    priority: "low",
    completed: 0,
    total: 1
  }
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-brand-dark">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Visão geral das operações da ContabilizeTech
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <Badge 
                    variant="secondary" 
                    className={`${stat.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-dark mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brand-teal" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'completed' 
                        ? 'bg-green-100 text-green-600'
                        : activity.status === 'processing'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-brand-dark">{activity.client}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-teal" />
                Próximas Tarefas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-brand-dark">{task.task}</h4>
                      <Badge 
                        variant={
                          task.priority === 'high' 
                            ? 'destructive' 
                            : task.priority === 'medium'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.deadline}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-brand-teal h-2 rounded-full"
                          style={{ width: `${(task.completed / task.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {task.completed}/{task.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
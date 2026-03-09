"use client";

import { useState, useEffect, FormEvent } from "react";
import { usersAPI } from "@/utils/api";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogClose 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UserPlus, Loader2, Edit, Eye, EyeOff, Trash2 } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMINISTRATOR';
};

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMINISTRATOR' as 'USER' | 'ADMINISTRATOR'
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      toast.error("Erro ao carregar usuários.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        password: '',
        role: editingUser.role
      });
    } else {
      setFormData({ name: '', email: '', password: '', role: 'ADMINISTRATOR' });
    }
  }, [editingUser, isModalOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setShowPassword(false);
    setIsModalOpen(true);
  };
  
  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingUser) {
        const updateData = { name: formData.name, email: formData.email, role: formData.role };
        await usersAPI.update(editingUser._id, updateData);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await usersAPI.create(formData);
        toast.success("Novo administrador criado com sucesso!");
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ocorreu um erro.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o usuário "${userName}"? Esta ação não pode ser desfeita.`)) {
      return;
    }
    try {
      await usersAPI.delete(userId);
      toast.success(`Usuário "${userName}" excluído com sucesso!`);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao excluir usuário.");
    }
  };


  if (isLoading) {
    return <div className="text-center p-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-brand-teal" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciar Usuários</CardTitle>
            <CardDescription>Adicione, edite ou remova usuários administradores.</CardDescription>
          </div>
          <Button onClick={handleOpenCreateModal} className="bg-brand-gradient">
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Admin
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map(user => (
            <div key={user._id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-dark-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Badge variant={user.role === 'ADMINISTRATOR' ? 'default' : 'secondary'} className="w-full sm:w-auto justify-center">
                  {user.role === 'ADMINISTRATOR' ? 'Admin' : 'Usuário'}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(user)} className="w-full sm:w-auto">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => handleDeleteUser(user._id, user.name)}
                  className="w-full sm:w-auto px-3"
                >
                  <Trash2 className="h-4 w-4 sm:mr-0" />
                  <span className="sm:hidden ml-2">Excluir</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editar Usuário' : 'Cadastrar Novo Administrador'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Altere os dados do usuário abaixo.' : 'Preencha os dados para criar um novo usuário.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required />
            </div>
            {!editingUser && (
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password} 
                    onChange={(e) => handleInputChange("password", e.target.value)} 
                    required 
                    className="pr-10"
                  />
                  <Button 
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="role">Permissão</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMINISTRATOR">Administrador</SelectItem>
                  <SelectItem value="USER">Usuário Comum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
              <Button type="submit" disabled={isSubmitting} className="bg-brand-gradient">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
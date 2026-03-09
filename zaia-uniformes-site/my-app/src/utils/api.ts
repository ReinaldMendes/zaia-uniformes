import axios from "axios";

// =============================
// INSTÂNCIA CENTRAL DA API
// =============================

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

// =============================
// TOKEN AUTH
// =============================

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// =============================
// MOCK DEV MODE
// =============================

type MockContentType = { [key: string]: string };

const mockResponses = {
  login: {
    data: {
      token: "mock_token_123",
      user: {
        id: "1",
        name: "Admin Zaia",
        email: "admin@zaiauniformes.com",
        role: "ADMIN",
      },
    },
  },

  content: {
    data: {
      "hero.title": "Uniformes profissionais para sua empresa",
      "hero.description":
        "A Zaia Uniformes oferece qualidade, conforto e identidade visual para sua equipe.",

      "hero.image": "/img/hero-uniformes.png",

      "footer.logo": "/img/logo-zaia.png",

      "footer.description":
        "Especialistas em uniformes profissionais para empresas, escolas e indústrias.",

      "footer.contact.email": "contato@zaiauniformes.com.br",
      "footer.contact.phone": "(42) 99999-9999",
      "footer.contact.address": "Castro - PR",

      "footer.copyright":
        "© 2026 Zaia Uniformes. Todos os direitos reservados.",
    } as MockContentType,
  },
};

const handleMockRequest = async (url: string) => {
  console.log(`[DEV MODE] Mock API: ${url}`);

  await new Promise((resolve) => setTimeout(resolve, 200));

  if (url === "/auth/login") return mockResponses.login;
  if (url === "/content") return mockResponses.content;

  return { data: { message: `Mock response for ${url}` } };
};

const isDevMode = process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === "true";

// =============================
// AUTH API
// =============================

export const authAPI = {
  login: (email: string, password: string) =>
    isDevMode
      ? handleMockRequest("/api/auth/login")
      : api.post("/api/auth/login", { email, password }),
};

// =============================
// CONTENT API
// =============================

export const contentAPI = {
  getAll: () =>
    isDevMode ? handleMockRequest("/api/content") : api.get("/api/content"),

  update: (key: string, value: string) =>
    api.put(`/api/content/${key}`, { value }),
};

// =============================
// USERS API
// =============================

export const usersAPI = {
  getAll: () => api.get("/users"),

  getById: (id: string) => api.get(`/users/${id}`),

  create: (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => api.post("/users", userData),

  update: (id: string, userData: any) =>
    api.put(`/users/${id}`, userData),

  delete: (id: string) => api.delete(`/users/${id}`),
};

// =============================
// PARTNERS API
// =============================

export const partnersAPI = {
  getAll: () => api.get("/partners"),

  create: (formData: FormData) =>
    api.post("/partners", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: string) => api.delete(`/partners/${id}`),
};
const PT_BR = {
  input: {
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
  },
  drawer: {
    close: 'Fechar',
  },
  dialog: {
    close: 'Fechar',
  },
  toast: {
    close: 'Fechar notificação',
  },
  spinner: {
    loading: 'Carregando',
  },
  common: {
    home: 'Home',
    cancel: 'Cancelar',
    save: 'Salvar',
    new: 'Novo',
    edit: 'Editar',
    delete: 'Excluir',
    confirm: 'Confirmar',
  },
  sidebar: {
    brand: 'Monorepo Template',
    navigation: 'Navegação principal',
    demo: 'Demo',
    usuarios: 'Usuários',
  },
  home: {
    title: 'Início',
    signedInAs: 'Você está conectado como',
    password: {
      title: 'Redefinir senha',
      current: 'Senha atual',
      next: 'Nova senha',
      confirm: 'Confirmar nova senha',
      submit: 'Salvar nova senha',
      success: 'Senha atualizada com sucesso.',
      failed: 'Não foi possível atualizar a senha.',
      invalidCurrent: 'Senha atual inválida.',
      mismatch: 'A confirmação da nova senha não confere.',
    },
  },
  placeholders: {
    demoTitle: 'Feature Demo',
    usersTitle: 'Usuários',
  },
  demo: {
    listTitle: 'Feature Demo',
    createTitle: 'Novo item de exemplo',
    editTitle: 'Editar item de exemplo',
    detailsTitle: 'Detalhes do item',
    closeDetails: 'Fechar detalhes',
    newItem: 'Novo item',
    searchLabel: 'Buscar itens',
    searchPlaceholder: 'Buscar por título...',
    searchAriaLabel: 'Buscar itens de exemplo',
    emptyList: 'Nenhum item de exemplo cadastrado',
    deleteDialog: {
      title: 'Excluir item',
      description: 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.',
    },
    fields: {
      title: 'Título',
      description: 'Descrição',
      author: 'Autor',
      updatedAt: 'Atualizado em',
    },
    placeholders: {
      title: 'Digite um título genérico',
      description: 'Descreva o propósito deste registro de exemplo',
    },
    errors: {
      saveFailed: 'Não foi possível salvar o item.',
      deleteFailed: 'Não foi possível excluir o item.',
    },
  },
  users: {
    createTitle: 'Cadastro de Usuário',
    editTitle: 'Editar Usuário',
    detailsTitle: 'Detalhes do Usuário',
    closeDetails: 'Fechar detalhes',
    newUser: 'Novo Usuário',
    edit: 'Editar',
    delete: 'Excluir',
    emptyList: 'Nenhum usuário cadastrado',
    deleteDialog: {
      title: 'Excluir usuário',
      description: 'Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.',
    },
    fields: {
      name: 'Nome',
      username: 'Usuário',
      password: 'Senha',
    },
    placeholders: {
      name: 'Digite o nome do usuário',
      username: 'Digite o nome de usuário para login',
      password: 'Digite a senha',
      passwordEdit: 'Deixe em branco para manter a senha atual',
    },
    errors: {
      saveFailed: 'Não foi possível salvar o usuário.',
      deleteFailed: 'Não foi possível excluir o usuário.',
    },
  },
  auth: {
    accessing: 'Acessando...',
    restoringSession: 'Restaurando sessão...',
    logout: 'Sair',
    errors: {
      invalidCredentials: 'Usuário ou senha inválidos.',
      invalidSession: 'Sua sessão expirou. Acesse novamente.',
      sessionUnavailable: 'Não foi possível acessar o armazenamento da sessão. Verifique as configurações do navegador.',
      unknown: 'Não foi possível concluir a operação. Tente novamente.',
      default: 'Erro ao efetuar login',
    },
    login: 'Acesse sua conta',
    username: 'Usuário',
    password: 'Senha',
    access: 'Acessar',
    usernamePlaceholder: 'Digite seu usuário',
    passwordPlaceholder: 'Digite sua senha',
    userNotFound: 'Usuário não encontrado',
  },
} as const;

export default PT_BR;

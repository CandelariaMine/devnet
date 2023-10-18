// Retorna el nombre de la pestana segun el Link
export const useTabsName = (pathname) => {
  if (pathname.includes("/admin")) {
    return "Admin";
  }
  switch (pathname) {
    case "/monitoreo/candelaria/clients":
      return "Clientes Candelaria";
    case "/monitoreo/candelaria/switches":
      return "Switches Candelaria";
    case "/monitoreo/vpn":
      return "VPN";
    case "/monitoreo/home":
      return "Home";
    case "/monitoreo/ups":
      return "UPS";
    case "/monitoreo/candelaria/mesh":
      return "Mesh Candelaria";
    case "/monitoreo/devices":
      return "Dispositivos";
    case "/monitoreo/firewalls":
      return "Firewalls";
    case "/monitoreo/wan":
      return "WAN";
    case "/login":
      return "Login Devnet";
    default:
      return "Sistema de Monitoreo";
  }
};

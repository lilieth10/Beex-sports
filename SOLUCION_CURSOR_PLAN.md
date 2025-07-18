# 🔧 Solución para Problema de Sincronización del Plan Cursor

## 📋 Descripción del Problema

**Síntoma:** La configuración muestra "Pro" pero el editor muestra "Free Plan"

## 🚀 Solución Automática (Recomendada)

He creado un script automático que resuelve este problema:

```bash
chmod +x fix_cursor_plan.sh
./fix_cursor_plan.sh
```

## 🛠️ Solución Manual (Paso a Paso)

### Paso 1: Cerrar Cursor Completamente
```bash
# Cerrar todos los procesos de Cursor
pkill -f "cursor"
# Esperar unos segundos
sleep 3
# Verificar que no hay procesos ejecutándose
ps aux | grep cursor
```

### Paso 2: Limpiar Archivos de Caché y Estado
```bash
# Eliminar archivo de estado principal
rm -f ~/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/state.vscdb

# Limpiar caché compartido
rm -rf ~/.vm-daemon/vm-daemon-cursor-data/CachedData/*

# Limpiar logs
rm -rf ~/.vm-daemon/vm-daemon-cursor-data/logs/*
```

### Paso 3: Reiniciar y Reautenticar
1. Abre Cursor nuevamente
2. Ve a configuración → Cuenta
3. Cierra sesión si está iniciada
4. Vuelve a iniciar sesión con tus credenciales
5. Verifica que el plan Pro esté sincronizado

## 🔍 Ubicaciones de Archivos Importantes

### Directorios de Configuración de Cursor:
- `~/.cursor/` - Configuración principal
- `~/.cursor-nightly/` - Versión nightly
- `~/.vm-daemon/vm-daemon-cursor-data/` - Datos de VM/remoto
- `~/.config/Cursor/` - Configuración del sistema

### Archivos Críticos:
- `state.vscdb` - Estado de la aplicación y autenticación
- `storage.json` - Almacenamiento global
- `settings.json` - Configuraciones de usuario

## ❗ Problemas Comunes y Soluciones

### 1. **Script no funciona**
```bash
# Hacer el script ejecutable
chmod +x fix_cursor_plan.sh
# Ejecutar con permisos de administrador si es necesario
sudo ./fix_cursor_plan.sh
```

### 2. **Cursor no se cierra completamente**
```bash
# Forzar cierre de procesos
sudo pkill -9 -f "cursor"
# O reiniciar el sistema
sudo reboot
```

### 3. **El problema persiste después de limpiar caché**
- Desinstalar Cursor completamente
- Eliminar todos los directorios de configuración
- Reinstalar desde [cursor.sh](https://cursor.sh)
- Configurar nuevamente

### 4. **Problemas de conexión**
- Verificar conexión a internet
- Verificar firewall/proxy
- Probar con VPN si es necesario

## 🔄 Alternativas de Solución

### Opción A: Reset Completo
```bash
# Respaldar configuraciones importantes
cp -r ~/.vm-daemon/vm-daemon-cursor-data/User/settings.json ~/cursor_settings_backup.json

# Eliminar toda la configuración
rm -rf ~/.cursor*
rm -rf ~/.vm-daemon/vm-daemon-cursor-data
rm -rf ~/.config/Cursor

# Reinstalar Cursor
# Restaurar configuraciones personales
```

### Opción B: Modo Incógnito/Temporal
- Abrir Cursor en modo incógnito
- Probar funcionalidad Pro
- Si funciona, el problema es de caché local

### Opción C: Múltiples Usuarios
- Crear nuevo usuario en el sistema
- Instalar Cursor para ese usuario
- Verificar si el problema se reproduce

## 📞 Contactar Soporte

Si ninguna solución funciona:

1. **Recopilar información:**
   - Capturas de pantalla del problema
   - Logs de Cursor (`~/.vm-daemon/vm-daemon-cursor-data/logs/`)
   - Información del sistema (`uname -a`)

2. **Contactar soporte oficial:**
   - Email: support@cursor.sh
   - Discord: Servidor oficial de Cursor
   - GitHub Issues: cursor-ai/cursor

3. **Información a incluir:**
   - Sistema operativo y versión
   - Versión de Cursor
   - Cuándo comenzó el problema
   - Pasos ya intentados

## ✅ Verificación Final

Después de aplicar cualquier solución:

1. ✅ Cursor muestra "Pro" en configuración
2. ✅ Editor muestra funciones Pro activas
3. ✅ No aparecen limitaciones de plan Free
4. ✅ Sincronización entre configuración y editor

## 💡 Prevención

Para evitar este problema en el futuro:

- Mantener Cursor actualizado
- No modificar manualmente archivos de configuración
- Cerrar Cursor correctamente (no forzar cierre)
- Mantener conexión estable a internet durante uso

---

**Nota:** Este problema suele resolverse con la limpieza de caché. Si persiste, probablemente sea un problema del servidor de Cursor que requiere contactar soporte.
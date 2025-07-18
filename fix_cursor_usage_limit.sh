#!/bin/bash

echo "🔧 Script para resolver problema de límites de uso en Cursor Pro"
echo "================================================================="

# Función para verificar si Cursor está ejecutándose
check_cursor_running() {
    if pgrep -f "cursor" > /dev/null; then
        return 0
    else
        return 1
    fi
}

echo "🔍 Problema detectado: Sistema muestra Pro Plan pero limita el uso"
echo "📅 Tu suscripción es desde 25 de junio, hoy es 18 de julio"
echo "⚡ Vamos a limpiar los archivos de límites de uso..."
echo ""

# Paso 1: Cerrar Cursor si está ejecutándose
echo "1. Verificando si Cursor está ejecutándose..."
if check_cursor_running; then
    echo "   ⚠️  Cursor está ejecutándose. Cerrando procesos..."
    pkill -f "cursor"
    sleep 3
    
    if check_cursor_running; then
        echo "   ❌ No se pudo cerrar Cursor completamente. Por favor, ciérralo manualmente."
        echo "      Presiona Enter para continuar"
        read
    else
        echo "   ✅ Cursor cerrado correctamente"
    fi
else
    echo "   ✅ Cursor no está ejecutándose"
fi

# Paso 2: Crear respaldo específico para límites de uso
echo ""
echo "2. Creando respaldo específico para archivos de límites..."
BACKUP_DIR="/tmp/cursor_usage_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Buscar archivos relacionados con límites de uso
USAGE_FILES=(
    "$HOME/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/state.vscdb"
    "$HOME/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/storage.json"
    "$HOME/.cursor/User/globalStorage/state.vscdb"
    "$HOME/.cursor-nightly/User/globalStorage/state.vscdb"
)

for file in "${USAGE_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   📁 Respaldando: $file"
        cp "$file" "$BACKUP_DIR/" 2>/dev/null
    fi
done

echo "   ✅ Respaldo creado en: $BACKUP_DIR"

# Paso 3: Limpiar archivos específicos de límites de uso
echo ""
echo "3. Limpiando archivos de límites de uso y caché de suscripción..."

# Archivos específicos de límites de uso
LIMIT_FILES=(
    "$HOME/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/state.vscdb"
    "$HOME/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/storage.json"
    "$HOME/.vm-daemon/vm-daemon-cursor-data/CachedData"
    "$HOME/.vm-daemon/vm-daemon-cursor-data/logs"
    "$HOME/.cursor/User/globalStorage/state.vscdb"
    "$HOME/.cursor-nightly/User/globalStorage/state.vscdb"
)

for item in "${LIMIT_FILES[@]}"; do
    if [ -f "$item" ]; then
        echo "   🗑️  Eliminando archivo: $item"
        rm -f "$item"
    elif [ -d "$item" ]; then
        echo "   🗑️  Limpiando directorio: $item"
        rm -rf "$item"/*
    fi
done

# Paso 4: Limpiar cachés específicos de autenticación y uso
echo ""
echo "4. Limpiando cachés de autenticación y medición de uso..."

# Buscar y limpiar archivos de sesión
find "$HOME/.vm-daemon/vm-daemon-cursor-data" -name "*session*" -type f -delete 2>/dev/null
find "$HOME/.vm-daemon/vm-daemon-cursor-data" -name "*token*" -type f -delete 2>/dev/null
find "$HOME/.vm-daemon/vm-daemon-cursor-data" -name "*auth*" -type f -delete 2>/dev/null

# Limpiar cachés de red que pueden contener límites obsoletos
if [ -d "$HOME/.vm-daemon/vm-daemon-cursor-data/Network Persistent State" ]; then
    echo "   🌐 Limpiando estado de red persistente..."
    rm -rf "$HOME/.vm-daemon/vm-daemon-cursor-data/Network Persistent State"/*
fi

if [ -d "$HOME/.vm-daemon/vm-daemon-cursor-data/Local Storage" ]; then
    echo "   💾 Limpiando almacenamiento local..."
    rm -rf "$HOME/.vm-daemon/vm-daemon-cursor-data/Local Storage"/*
fi

echo "   ✅ Limpieza de cachés completada"

# Paso 5: Verificar conectividad
echo ""
echo "5. Verificando conectividad con servidores de Cursor..."
if ping -c 1 cursor.sh > /dev/null 2>&1; then
    echo "   ✅ Conectividad con cursor.sh: OK"
else
    echo "   ⚠️  Problema de conectividad con cursor.sh"
fi

# Paso 6: Instrucciones específicas para límites de uso
echo ""
echo "6. ✅ PROCESO COMPLETADO - INSTRUCCIONES ESPECÍFICAS"
echo "================================================================="
echo ""
echo "📋 SIGUIENTES PASOS IMPORTANTES:"
echo ""
echo "1. 🚀 Abre Cursor nuevamente"
echo "2. 🔑 Ve a Configuración → General → Manage Account"
echo "3. 🔄 Haz clic en 'Open' para abrir la gestión de cuenta"
echo "4. 🔐 Verifica que tu suscripción Pro esté activa"
echo "5. ✅ Cierra la configuración y prueba usar un modelo Pro"
echo ""
echo "🎯 SI AÚN TIENES PROBLEMAS:"
echo ""
echo "A) 📧 Contacta soporte inmediatamente con esta info:"
echo "   - Email: support@cursor.sh"
echo "   - Mensaje: 'Pro subscription desde 25/06 pero muestra límite de uso'"
echo "   - Include: Captura de tu página de facturación"
echo ""
echo "B) 🔄 Alternativa temporal:"
echo "   - Usa el botón 'Continue with API Pro' si aparece"
echo "   - Esto debería funcionar mientras se resuelve el problema"
echo ""
echo "C) 💡 Verifica en tu cuenta web:"
echo "   - Ve a https://cursor.sh/settings"
echo "   - Confirma que la suscripción está activa"
echo "   - Verifica la fecha de renovación"
echo ""
echo "💾 RESPALDO: $BACKUP_DIR"
echo ""
echo "⚠️  NOTA IMPORTANTE:"
echo "Este problema suele ser del lado del servidor de Cursor."
echo "Si persiste después de estos pasos, es definitivamente"
echo "un problema de sincronización que requiere soporte técnico."
echo ""
echo "✨ ¡Esperamos que esto resuelva tu problema de límites!"
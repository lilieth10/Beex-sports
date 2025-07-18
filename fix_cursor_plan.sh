#!/bin/bash

echo "🔧 Script para resolver problema de sincronización del plan Cursor"
echo "======================================================================"

# Función para verificar si Cursor está ejecutándose
check_cursor_running() {
    if pgrep -f "cursor" > /dev/null; then
        return 0  # Cursor está ejecutándose
    else
        return 1  # Cursor no está ejecutándose
    fi
}

# Paso 1: Cerrar Cursor si está ejecutándose
echo "1. Verificando si Cursor está ejecutándose..."
if check_cursor_running; then
    echo "   ⚠️  Cursor está ejecutándose. Cerrando procesos..."
    pkill -f "cursor"
    sleep 3
    
    # Verificar si se cerró correctamente
    if check_cursor_running; then
        echo "   ❌ No se pudo cerrar Cursor completamente. Por favor, ciérralo manualmente."
        echo "      Presiona Ctrl+C para cancelar o Enter para continuar"
        read
    else
        echo "   ✅ Cursor cerrado correctamente"
    fi
else
    echo "   ✅ Cursor no está ejecutándose"
fi

# Paso 2: Respaldar archivos importantes
echo ""
echo "2. Creando respaldo de archivos de configuración..."
BACKUP_DIR="/tmp/cursor_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Buscar directorios de Cursor
CURSOR_DIRS=(
    "$HOME/.cursor"
    "$HOME/.cursor-nightly" 
    "$HOME/.vm-daemon/vm-daemon-cursor-data"
    "$HOME/.config/Cursor"
)

for dir in "${CURSOR_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "   📁 Respaldando: $dir"
        cp -r "$dir" "$BACKUP_DIR/" 2>/dev/null
    fi
done

echo "   ✅ Respaldo creado en: $BACKUP_DIR"

# Paso 3: Limpiar archivos de caché y estado
echo ""
echo "3. Limpiando archivos de caché y estado..."

# Archivos específicos a limpiar
FILES_TO_CLEAN=(
    "$HOME/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/state.vscdb"
    "$HOME/.vm-daemon/vm-daemon-cursor-data/User/globalStorage/storage.json"
    "$HOME/.vm-daemon/vm-daemon-cursor-data/Shared Dictionary/cache"
    "$HOME/.cursor/User/globalStorage/state.vscdb"
    "$HOME/.cursor-nightly/User/globalStorage/state.vscdb"
)

for file in "${FILES_TO_CLEAN[@]}"; do
    if [ -f "$file" ]; then
        echo "   🗑️  Eliminando: $file"
        rm -f "$file"
    fi
done

# Limpiar directorios de caché
CACHE_DIRS=(
    "$HOME/.vm-daemon/vm-daemon-cursor-data/CachedData"
    "$HOME/.vm-daemon/vm-daemon-cursor-data/logs"
    "$HOME/.cursor/CachedData"
    "$HOME/.cursor-nightly/CachedData"
)

for dir in "${CACHE_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "   🗑️  Limpiando caché: $dir"
        rm -rf "$dir"/*
    fi
done

echo "   ✅ Limpieza completada"

# Paso 4: Instrucciones finales
echo ""
echo "4. ✅ PROCESO COMPLETADO"
echo "======================================================================"
echo ""
echo "📋 SIGUIENTES PASOS:"
echo ""
echo "1. Abre Cursor nuevamente"
echo "2. Inicia sesión con tus credenciales"
echo "3. Ve a la configuración para verificar que tu plan Pro esté sincronizado"
echo "4. Si el problema persiste, contacta al soporte de Cursor"
echo ""
echo "💾 INFORMACIÓN DEL RESPALDO:"
echo "   - Ubicación: $BACKUP_DIR"
echo "   - Puedes restaurar los archivos desde aquí si es necesario"
echo ""
echo "🔍 ALTERNATIVAS SI NO FUNCIONA:"
echo "   - Desinstalar y reinstalar Cursor"
echo "   - Verificar tu conexión a internet"
echo "   - Contactar soporte con capturas de pantalla del problema"
echo ""
echo "✨ ¡Esperamos que esto resuelva tu problema!"
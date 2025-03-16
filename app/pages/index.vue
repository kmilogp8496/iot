<script setup lang="ts">
const tasks = ref([
  {
    title: 'Añadir autenticación con github',
    completed: true,
  },
  {
    title: 'Página de sensores',
    completed: false,
    children: [
      {
        title: 'API: Listar',
        completed: false,
      },
      {
        title: 'API: Listar unidades de medición',
        completed: false,
      },
      {
        title: 'API: Crear',
        completed: false,
      },
      {
        title: 'API: Actualizar',
        completed: false,
      },
      {
        title: 'API: Eliminar',
        completed: false,
      },
    ],
  },
  {
    title: 'Conectar primer sensor con autenticación',
    completed: false,
  },
  {
    title: 'Escribir datos del sensor en base de datos de métricas',
    completed: false,
  },
  {
    title: 'Crear gráficos de en Grafana',
    completed: false,
  },
  {
    title: 'Integrar Dashboard de grafana en esta página',
    completed: false,
  },
  {
    title: 'Añadir alertas en la aplicación (grafana o esta app)',
    completed: false,
  },
  {
    title: 'Añadir programación de sensores via wireless',
    completed: false,
  },
  {
    title: 'Añadir programas básicos para los sensores desde la app',
    completed: false,
  },
])
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
    <div class="flex items-center md:order-2 lg:order-1">
      <UAlert
        variant="outline"
        icon="i-heroicons-list-bullet"
        title="Listado de tareas"
        description="Esta es la lista de tareas que se han de completar para el proyecto."
      />
    </div>
    <div class="pt-4 space-y-4 md:order-1 lg:order-2">
      <div
        v-for="task in tasks"
        :key="task.title"
      >
        <UCheckbox
          :model-value="task.completed"
          disabled
          aria-readonly="true"
          :label="task.title"
        />
        <div v-if="task.children" class="pl-4 pt-2 space-y-2">
          <UCheckbox
            v-for="child in task.children"
            :key="child.title + task.title"
            :model-value="child.completed"
            disabled
            aria-readonly="true"
            :label="child.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

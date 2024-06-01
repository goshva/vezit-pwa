<script setup>
import { reactive, ref } from "vue";

// vue-chartjs, for more info and examples you can check out https://vue-chartjs.org/ and http://www.chartjs.org/docs/ -->
import { Line, Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Set Global Chart.js configuration
Chart.defaults.color = "#818d96";
Chart.defaults.scale.grid.lineWidth = 0;
Chart.defaults.scale.beginAtZero = true;
Chart.defaults.datasets.bar.maxBarThickness = 45;
Chart.defaults.elements.bar.borderRadius = 4;
Chart.defaults.elements.bar.borderSkipped = false;
Chart.defaults.elements.point.radius = 0;
Chart.defaults.elements.point.hoverRadius = 0;
Chart.defaults.plugins.tooltip.radius = 3;
Chart.defaults.plugins.legend.labels.boxWidth = 10;

// Helper variables
const orderSearch = ref(false);

// Chart Earnings data
const earningsData = reactive({
  labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  datasets: [
    {
      label: "This Week",
      fill: true,
      backgroundColor: "rgba(100, 116, 139, .7)",
      borderColor: "transparent",
      pointBackgroundColor: "rgba(100, 116, 139, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(100, 116, 139, 1)",
      data: [716, 628, 1056, 560, 956, 890, 790],
    },
    {
      label: "Last Week",
      fill: true,
      backgroundColor: "rgba(100, 116, 139, .15)",
      borderColor: "transparent",
      pointBackgroundColor: "rgba(100, 116, 139, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(100, 116, 139, 1)",
      data: [1160, 923, 1052, 1300, 880, 926, 963],
    },
  ],
});

// Chart Earnings options
const earningsOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      grid: {
        drawBorder: false,
      },
    },
    y: {
      display: false,
      grid: {
        drawBorder: false,
      },
    },
  },
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      labels: {
        boxHeight: 10,
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.dataset.label + ": $" + context.parsed.y;
        },
      },
    },
  },
});

</script>

<template>
  <!-- Hero -->
  <div class="content">
    <div class="row">
      <div class="col-xl-5 col-xxl-3 d-flex flex-column">
        <BaseBlock tag="a" link-pop content-full href="javascript:void(0)">
          <thead>
                  <tr>
                    <th>
                      <div class="fs-1 fw-normal text-dark">Эффективность</div>
                    </th>

                  </tr>
                  <tr>
                    <th>
                      <div class="fs-5 fw-normal text-dark">Переходов/Показов</div>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <div class="fs-5 fw-normal text-dark">
                        <strong>400/500</strong>
                      </div>
                    </th>
                    <th>
                      <span class="fs-1 fw-normal text-dark">
                        <strong>90%</strong>
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <div class="fs-5 fw-normal text-dark">Оценка конверсии:</div>
                    </th>
                    <th>
                      <div class="fs-5 fw-normal text-dark">отлично</div>
                    </th>
                  </tr>
                </thead>
      </BaseBlock>
  </div>
</div>
</div>
  <!-- Page Content -->
  <div class="content">
    <!-- Statistics -->
    <div class="row">
      <div class="col-xl-12 col-xxl-12 d-flex flex-column">
        <!-- Earnings Summary -->
        <BaseBlock
          title="Earnings Summary"
          class="flex-grow-1 d-flex flex-column"
        >
          <template #options>
            <button type="button" class="btn-block-option">
              <i class="si si-settings"></i>
            </button>
          </template>

          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex items-center"
            >
              <Bar
                :data="earningsData"
                :options="earningsOptions"
                class="w-100"
              />
            </div>
            <div class="block-content bg-body-light">
              <div class="row items-push text-center w-100">
                <div class="col-sm-4">
                  <dl class="mb-0">
                    <dt
                      class="fs-3 fw-bold d-inline-flex align-items-center space-x-2"
                    >
                      <i class="fa fa-caret-up fs-base text-success"></i>
                      <span>2.5%</span>
                    </dt>
                    <dd class="fs-sm fw-medium text-muted mb-0">
                      Customer Growth
                    </dd>
                  </dl>
                </div>
                <div class="col-sm-4">
                  <dl class="mb-0">
                    <dt
                      class="fs-3 fw-bold d-inline-flex align-items-center space-x-2"
                    >
                      <i class="fa fa-caret-up fs-base text-success"></i>
                      <span>3.8%</span>
                    </dt>
                    <dd class="fs-sm fw-medium text-muted mb-0">Page Views</dd>
                  </dl>
                </div>
                <div class="col-sm-4">
                  <dl class="mb-0">
                    <dt
                      class="fs-3 fw-bold d-inline-flex align-items-center space-x-2"
                    >
                      <i class="fa fa-caret-down fs-base text-danger"></i>
                      <span>1.7%</span>
                    </dt>
                    <dd class="fs-sm fw-medium text-muted mb-0">
                      New Products
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>
        <!-- END Earnings Summary -->
      </div>
    </div>
    <!-- END Statistics -->
    <!-- END Recent Orders -->
  </div>
  <!-- END Page Content -->
</template>

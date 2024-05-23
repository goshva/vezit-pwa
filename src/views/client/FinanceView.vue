<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Финансы" class="mb-0">
      <template #options>
        <span class="fs-6 fw-semibold">Создать отчет</span>
      </template>

      <template #content>
        <div class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-none d-xl-table-cell">Событие</th>
                  <th>Время</th>
                  <th class="d-none d-sm-table-cell text-center">Описание</th>
                  <th class="d-none d-sm-table-cell text-end">Сумма</th>
                  <th class="d-none d-sm-table-cell text-end">Состояние</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr>
                  <td class="d-none d-xl-table-cell">
                    <p class="fs-sm fw-medium text-muted mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="green"
                        class="w-3 h-3"
                        style="width: 32px"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      Пополнение
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      11:00 12.05.2024
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">Через СБП</p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    5000 ₽
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <p class="fs-xs fw-semibold mb-0">Проведено</p>
                  </td>
                </tr>
                <tr>
                  <td class="d-none d-xl-table-cell">
                    <p class="fs-sm fw-medium text-muted mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="red"
                        style="width: 32px"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Списание
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      12:32 12.05.2024
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">
                      Показ видео "Магазин цветов"
                    </p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    0.1 ₽
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <p class="fs-xs fw-semibold mb-0">Проведено</p>
                  </td>
                </tr>
                <tr>
                  <td class="d-none d-xl-table-cell">
                    <p class="fs-sm fw-medium text-muted mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="red"
                        style="width: 32px"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      Списание
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      11:00 12.05.2024
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">
                      Показ видео "Магазин цветов"
                    </p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    0.1 ₽
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <p class="fs-xs fw-semibold mb-0">Проведено</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- <div class="block-content block-content-full bg-body-light">
          <nav aria-label="Photos Search Navigation">
            <ul class="pagination pagination-sm justify-content-end mb-0">
              <li class="page-item">
                <a
                  class="page-link"
                  href="javascript:void(0)"
                  tabindex="-1"
                  aria-label="Previous"
                >
                  Prev
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="javascript:void(0)">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0)">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0)">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0)">4</a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="javascript:void(0)"
                  aria-label="Next"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div> -->
      </template>
    </BaseBlock>
    <!-- END Recent Orders -->
  </div>
</template>
<script setup></script>
<style lang="scss"></style>

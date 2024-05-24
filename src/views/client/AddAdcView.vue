<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Рекламные компании" class="mb-0">
      <template #options>
        <button type="submit" class="btn w-100">
          <i class=""></i>
          Добавить РК
        </button>
      </template>
      <template #content>
        <div class="block-content block-content-full m-2">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-none d-xl-table-cell">Статус</th>
                  <th>Название РК</th>
                  <th class="d-none d-sm-table-cell">Дата начала</th>
                  <th class="d-none d-sm-table-cell">Город</th>
                  <th class="d-none d-sm-table-cell">Эффективность</th>
                  <th class="d-none d-sm-table-cell">Стоимость РК</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr @click="redirectToDetail('campaign-1')" class="clickable-row">
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
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      <strong>Магазин цветов</strong>
                    </p>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      Описание
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">12.05.2024</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted">
                    Пятигорск Ессентуки Лермонтов<br/> Кисловодск Винсады Ясная поляна
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">400/500</p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">
                      5000₽
                    </p>
                  </td>
                </tr>
                <tr @click="redirectToDetail('campaign-2')" class="clickable-row">
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
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      <strong>Магазин цветов</strong>
                    </p>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      Описание
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">12.05.2024</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted">
                    Пятигорск Ессентуки Лермонтов<br/> Кисловодск Винсады Ясная поляна
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">400/500</p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">
                      5000₽
                    </p>
                  </td>
                </tr>
                <tr @click="redirectToDetail('campaign-3')" class="clickable-row">
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
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      <strong>Магазин цветов</strong>
                    </p>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      Описание
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">12.05.2024</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted">
                    Пятигорск Ессентуки Лермонтов<br/> Кисловодск Винсады Ясная поляна
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">400/500</p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">
                      5000₽
                    </p>
                  </td>
                </tr>
                <tr @click="redirectToDetail('campaign-4')" class="clickable-row">
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
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      <strong>Магазин цветов</strong>
                    </p>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      Описание
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">12.05.2024</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted">
                    Пятигорск Ессентуки Лермонтов<br/> Кисловодск Винсады Ясная поляна
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">400/500</p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">
                      5000₽
                    </p>
                  </td>
                </tr>
                <tr @click="redirectToDetail('campaign-5')" class="clickable-row">
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
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      <strong>Магазин цветов</strong>
                    </p>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      Описание
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">12.05.2024</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted">
                    Пятигорск Ессентуки Лермонтов<br/> Кисловодск Винсады Ясная поляна
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">400/500</p>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <p class="fs-xs fw-semibold mb-0">
                      5000₽
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const redirectToDetail = (campaignId) => {
  router.push("/client/addAdc/1");
};
</script>

<style lang="scss">
.clickable-row {
  cursor: pointer;
  transition: background-color 0.3s;
}

.clickable-row:hover {
  background-color: #f0f0f0;
}
</style>

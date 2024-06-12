<template>
  <BaseBlock title="Обратная связь" class="m-5">
    <div class="">
      <!-- Sign In Form -->
      <div class="mb-4">
        Задайте свой вопрос:
      </div>
        <div class="mb-4">
          <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              placeholder="Введите вопрос"
            />
          </div>

          <div class="mb-4">
            <strong>Наши контакты:
            8(999)-555-55-55
            example@mail.ru
          </strong>
          </div>

          
          <div class="mb-4">
            <button type="submit" class="btn w-100 btn-alt-primary">
              <i class=""></i>
              Отправить
            </button>
          </div>
        </div>
        <!-- END Sign In Form -->
  </BaseBlock>
<!-- END ask question form -->

  <BaseBlock title="Обращения в техподдержку" class="m-5">
    <template #options>
      <div class="space-x-1">
        <button type="button" class="btn btn-sm btn-alt-secondary">
          <i class="fa fa-search"></i>
        </button>
        <div class="dropdown d-inline-block">
          <button
              type="button"
              class="btn btn-sm btn-alt-secondary"
              id="dropdown-recent-orders-filters"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
          >
            <i class="fa fa-fw fa-flask"></i>
            Filters
            <i class="fa fa-angle-down ms-1"></i>
          </button>
          <div
              class="dropdown-menu dropdown-menu-md dropdown-menu-end fs-sm"
              aria-labelledby="dropdown-recent-orders-filters"
          >
            <a
                class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
            >
              Pending
              <span class="badge bg-primary rounded-pill">20</span>
            </a>
            <a
                class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
            >
              Active
              <span class="badge bg-primary rounded-pill">72</span>
            </a>
            <a
                class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
            >
              Completed
              <span class="badge bg-primary rounded-pill">890</span>
            </a>
            <a
                class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
            >
              All
              <span class="badge bg-primary rounded-pill">997</span>
            </a>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="block-content block-content-full">
        <div class="table-responsive">
          <table class="table table-hover table-vcenter">
            <thead>
            <tr>
              <th class="d-none d-sm-table-cell">Время</th>
              <th class="d-none d-sm-table-cell">Статус</th>
            </tr>
            </thead>
            <tbody class="fs-sm">
            <tr>
              <td class="d-none d-sm-table-cell fw-semibold text-muted text-start">
                7 min ago
              </td>
              <td>
                <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                      >Отвечено</span>
              </td>
            </tr>
            <tr>
              <td class="d-none d-sm-table-cell fw-semibold text-muted text-start">
                26 min ago
              </td>
              <td>
                <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">
                  Завершено
                </span>
              </td>
            </tr>
            <tr>
              <td class="d-none d-sm-table-cell fw-semibold text-muted text-start">
                19 min ago
              </td>
              <td>
                <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                >Отвечено</span>
              </td>
            </tr>
            <tr>
              <td class="d-none d-sm-table-cell fw-semibold text-muted text-start">
                13 min ago
              </td>
              <td>
                <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">
                  Завершено
                </span>
              </td>
            </tr>
            <tr>
              <td class="d-none d-sm-table-cell fw-semibold text-muted text-start">
                4 min ago
              </td>
              <td>
                <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">
                  Завершено
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="block-content block-content-full bg-body-light">
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
      </div>
    </template>
  </BaseBlock>

</template>
<script setup>
import ClientMap from "@/components/ClientMap.vue";
</script>
<style lang="scss"></style>

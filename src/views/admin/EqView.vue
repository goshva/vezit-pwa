<template>
    <div class="m-5 mb-0">
      <BaseBlock title="Список оборудования" class="mb-0">
        <template #options>
          <div class="space-x-1">
            <button
              type="button"
              class="btn btn-sm btn-alt-secondary"
              @click="
                () => {
                  orderSearch = !orderSearch;
                }
              "
            >
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
                  Все
                  <span class="badge bg-primary rounded-pill">20</span>
                </a>
                <a
                  class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                  href="javascript:void(0)"
                >
                  В работе
                  <span class="badge bg-primary rounded-pill">72</span>
                </a>
                <a
                  class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                  href="javascript:void(0)"
                >
                  Готово
                  <span class="badge bg-primary rounded-pill">890</span>
                </a>
                <a
                  class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                  href="javascript:void(0)"
                >
                  Ошибка
                  <span class="badge bg-primary rounded-pill">997</span>
                </a>
              </div>
            </div>
          </div>
        </template>
  
        <template #content>
          <!-- <div
            v-if="orderSearch"
            id="one-dashboard-search-orders"
            class="block-content border-bottom"
          >
            <form @submit.prevent>
              <div class="push">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control form-control-alt"
                    id="one-ecom-orders-search"
                    name="one-ecom-orders-search"
                    placeholder="Search all orders.."
                  />
                  <span class="input-group-text bg-body border-0">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div> -->
          <div class="block-content block-content-full">
            <div class="table-responsive">
              <table class="table table-hover table-vcenter">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th class="d-none d-xl-table-cell">Партнер</th>
                    <th>Статус</th>
                    <th class="d-none d-sm-table-cell text-end">Дата</th>
                  </tr>
                </thead>
                <tbody class="fs-sm">
                  <tr>
                    <td>
                      <a class="fw-semibold" href="javascript:void(0)">
                        ORD.00925
                      </a>
                      <p class="fs-sm fw-medium text-muted mb-0">Premium</p>
                    </td>
                    <td class="d-none d-xl-table-cell">
                      <a class="fw-semibold" href="javascript:void(0)"
                        >Marie Duncan</a
                      >
                      <p class="fs-sm fw-medium text-muted mb-0">Photographer</p>
                    </td>
                    <td>
                      <span
                        class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                        >Готово</span>
                    </td>
                    <td
                      class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    >
                      7 min ago
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a class="fw-semibold" href="javascript:void(0)">
                        ORD.00924
                      </a>
                      <p class="fs-sm fw-medium text-muted mb-0">Premium</p>
                    </td>
                    <td class="d-none d-xl-table-cell">
                      <a class="fw-semibold" href="javascript:void(0)"
                        >Jack Estrada</a
                      >
                      <p class="fs-sm fw-medium text-muted mb-0">Photographer</p>
                    </td>
                    <td>
                      <span
                        class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info"
                        >В работе</span>
                    </td>
                    <td
                      class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    >
                      26 min ago
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a class="fw-semibold" href="javascript:void(0)">
                        ORD.00923
                      </a>
                      <p class="fs-sm fw-medium text-muted mb-0">Premium</p>
                    </td>
                    <td class="d-none d-xl-table-cell">
                      <a class="fw-semibold" href="javascript:void(0)"
                        >Megan Fuller</a
                      >
                      <p class="fs-sm fw-medium text-muted mb-0">Web developer</p>
                    </td>
                    <td>
                      <span
                        class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                        >Готово</span>
                    </td>
                    <td
                      class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    >
                      19 min ago
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a class="fw-semibold" href="javascript:void(0)">
                        ORD.00922
                      </a>
                      <p class="fs-sm fw-medium text-muted mb-0">Premium</p>
                    </td>
                    <td class="d-none d-xl-table-cell">
                      <a class="fw-semibold" href="javascript:void(0)"
                        >Lisa Jenkins</a
                      >
                      <p class="fs-sm fw-medium text-muted mb-0">
                        Application Manager
                      </p>
                    </td>
                    <td>
                      <span
                        class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-warning-light text-warning"
                        >Ошибка</span>
                    </td>
                    <td
                      class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    >
                      13 min ago
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a class="fw-semibold" href="javascript:void(0)">
                        ORD.00921
                      </a>
                      <p class="fs-sm fw-medium text-muted mb-0">Premium</p>
                    </td>
                    <td class="d-none d-xl-table-cell">
                      <a class="fw-semibold" href="javascript:void(0)"
                        >Brian Stevens</a
                      >
                      <p class="fs-sm fw-medium text-muted mb-0">Photographer</p>
                    </td>
                    <td>
                      <span
                        class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                        >Готово</span>
                    </td>
                    <td
                      class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    >
                      4 min ago
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a class="fw-semibold" href="javascript:void(0)">
                        ORD.00920
                      </a>
                      <p class="fs-sm fw-medium text-muted mb-0">Premium</p>
                    </td>
                    <td class="d-none d-xl-table-cell">
                      <a class="fw-semibold" href="javascript:void(0)"
                        >Jesse Fisher</a
                      >
                      <p class="fs-sm fw-medium text-muted mb-0">Digital Nomad</p>
                    </td>
                    <td>
                      <span
                        class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-warning-light text-warning"
                        >Ошибка</span>
                    </td>
                    <td
                      class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    >
                      23 min ago
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a class="fw-semibold" href="javascript:void(0)">
                        ORD.00919
                      </a>
                      <p class="fs-sm fw-medium text-muted mb-0">Premium</p>
                    </td>
                    <td class="d-none d-xl-table-cell">
                      <a class="fw-semibold" href="javascript:void(0)"
                        >Carol Ray</a
                      >
                      <p class="fs-sm fw-medium text-muted mb-0">Web developer</p>
                    </td>
                    <td>
                      <span
                        class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info"
                        >В работе</span>
                    </td>
                    <td
                      class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    >
                      15 min ago
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
      <!-- END Recent Orders -->
    </div>
  </template>
  <script setup></script>
  <style lang="scss"></style>
  
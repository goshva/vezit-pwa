<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Список рекламных компании" class="mb-0">
      <template #options>
        <div class="space-x-1">
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
              Фильтр
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
                  </div>
                </div>
              </form>
            </div> -->
        <div class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-none d-xl-table-cell">Название</th>
                  <th>Статус</th>
                  <th class="d-none d-sm-table-cell text-center">Видео</th>
                  <th class="d-none d-sm-table-cell text-end">Ссылка</th>
                  <th class="d-none d-sm-table-cell text-end">Бюджет</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)"
                      >Marie Duncan</a
                    >
                    <p class="fs-sm fw-medium text-muted mb-0">Photographer</p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                      >Completed</span
                    >
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <div class="progress mb-1" style="height: 5px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 8%"
                        aria-valuenow="8"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="fs-xs fw-semibold mb-0">8%</p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    7 min ago
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>$786,81</strong>
                  </td>
                </tr>
                <tr>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)"
                      >Jack Estrada</a
                    >
                    <p class="fs-sm fw-medium text-muted mb-0">Photographer</p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info"
                      >Active</span
                    >
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <div class="progress mb-1" style="height: 5px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 6%"
                        aria-valuenow="6"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="fs-xs fw-semibold mb-0">6%</p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    26 min ago
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>$786,81</strong>
                  </td>
                </tr>
                <tr>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)"
                      >Megan Fuller</a
                    >
                    <p class="fs-sm fw-medium text-muted mb-0">Web developer</p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                      >Completed</span
                    >
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <div class="progress mb-1" style="height: 5px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 25%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="fs-xs fw-semibold mb-0">25%</p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    19 min ago
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>$786,81</strong>
                  </td>
                </tr>
                <tr>
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
                      >Pending</span
                    >
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <div class="progress mb-1" style="height: 5px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 18%"
                        aria-valuenow="18"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="fs-xs fw-semibold mb-0">18%</p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    13 min ago
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>$786,81</strong>
                  </td>
                </tr>
                <tr>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)"
                      >Brian Stevens</a
                    >
                    <p class="fs-sm fw-medium text-muted mb-0">Photographer</p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                      >Completed</span
                    >
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <div class="progress mb-1" style="height: 5px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 10%"
                        aria-valuenow="10"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="fs-xs fw-semibold mb-0">10%</p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    4 min ago
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>$786,81</strong>
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

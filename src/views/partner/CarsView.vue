<template>
  <div class="m-5">
    <BaseBlock class="mb-0">
      <template #content>
        <ul class="nav nav-tabs nav-tabs-block" role="tablist">
          <li class="nav-item">
            <button
              class="nav-link active"
              id="btabs-static-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#btabs-static-home"
              role="tab"
              aria-controls="btabs-static-home"
              aria-selected="true"
            >
              Мои авто
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              id="btabs-static-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#btabs-static-profile"
              role="tab"
              aria-controls="btabs-static-profile"
              aria-selected="false"
            >
              Добавить
            </button>
          </li>
        </ul>
        <div class="block-content tab-content">
          <div
            class="tab-pane active"
            id="btabs-static-home"
            role="tabpanel"
            aria-labelledby="btabs-static-home-tab"
            tabindex="0"
          >
          <BaseBlock title="Мои авто" >
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
        <div
          v-if="orderSearch"
          id="one-dashboard-search-orders"
          class="block-content border-bottom"
        >
          <!-- Search Form -->
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
          <!-- END Search Form -->
        </div>
        <div class="block-content block-content-full">
          <!-- Recent Orders Table -->
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th>Номер машины</th>
                  <th class="d-none d-xl-table-cell">Водитель</th>
                  <th>Статус</th>
                  <th class="d-none d-sm-table-cell text-center">Доходность</th>
                  <th class="d-none d-sm-table-cell text-end">Создан</th>
                  <th class="d-none d-sm-table-cell text-end">Зароботок</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr>
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">
                      О 760 АЕ 77
                    </a>
                    <p class="fs-sm fw-medium text-muted mb-0">ID: 12323132145</p>
                  </td>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)"
                      >Marie Duncan</a
                    >
                    <p class="fs-sm fw-medium text-muted mb-0"></p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success"
                      >Online</span
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
                    7 минут назад
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>786,81₽</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">
                      К 539ХТ 116
                    </a>
                    <p class="fs-sm fw-medium text-muted mb-0">ID: 23123122313</p>
                  </td>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)"
                      >Jack Estrada</a
                    >
                    <p class="fs-sm fw-medium text-muted mb-0"></p>
                  </td>
                  <td>
                    <span
                    class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-warning-light text-warning"
                      >Offline</span
                    >
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <div class="progress mb-1" style="height: 5px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 20%"
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
                    1 час назад
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>21184,20₽</strong>
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
                    <strong>$2379,44</strong>
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
                    <strong>$458,52</strong>
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
                    <strong>$476,82</strong>
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
                      >Pending</span
                    >
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <div class="progress mb-1" style="height: 5px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 23%"
                        aria-valuenow="23"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="fs-xs fw-semibold mb-0">23%</p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    23 min ago
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>$1939,58</strong>
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
                      >Active</span
                    >
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <div class="progress mb-1" style="height: 5px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 14%"
                        aria-valuenow="14"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="fs-xs fw-semibold mb-0">14%</p>
                  </td>
                  <td
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                  >
                    15 min ago
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>$2200,10</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- END Recent Orders Table -->
        </div>
        <div class="block-content block-content-full bg-body-light">
          <!-- Pagination -->
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
          <!-- END Pagination -->
        </div>
      </template>
    </BaseBlock>
          </div>
          <div
            class="tab-pane"
            id="btabs-static-profile"
            role="tabpanel"
            aria-labelledby="btabs-static-profile-tab"
            tabindex="0"
          >
          <BaseBlock title="Добавить новую машину">
          <div class="">
              <!-- Sign In Form -->
                  <div class="mb-4">
                    <input
                    type="text"
                      class="form-control form-control-alt form-control-lg"
                      placeholder="Марка"
                    />
                  </div>

                  <div class="mb-4">
                    <input
                    type="text"
                      class="form-control form-control-alt form-control-lg"
                      placeholder="Модель"
                    />
                  </div>

                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-alt form-control-lg"
                      placeholder="Цвет"
                    />
                  </div>

                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-alt form-control-lg"
                      placeholder="Государственный номер"
                    />
                  </div>

                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-alt form-control-lg"
                      placeholder="Коментарий"
                    />
                  </div>
                    <div class="mb-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="login-remember"
                        name="login-remember"
                      />
                      <label class="form-check-label" for="login-remember"
                        >Создать договор</label
                      >
                    </div>
                    </div>
                    <div class="mb-4">
                    <button type="submit" class="btn w-100 btn-alt-primary">
                      <i class=""></i>
                      Создать
                    </button>
                  </div>
                </div>
              <!-- END Sign In Form -->
        </BaseBlock>
          </div>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>
<script setup></script>
<style lang="scss"></style>
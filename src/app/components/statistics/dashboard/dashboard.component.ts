import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventService } from 'src/app/services/event/event.service';
import { PromoService } from 'src/app/services/promo/promo.service';
import { RouteService } from 'src/app/services/route/route.service';
import { StoreService } from 'src/app/services/store/store.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  stores: any = [];
  promos: any = [];
  events: any = [];
  routes: any = [];
  pieInfo: any = [];
  barInfo: any = [];
  age1: any = 0;
  age2: any = 0;
  age3: any = 0;
  age4: any = 0;
  age5: any = 0;
  age6: any = 0;
  public data: any = [];
  data2: any = [];

  constructor(
    private auth: AuthService,
    private user: UserService,
    private store: StoreService,
    private promo: PromoService,
    private event: EventService,
    private route: RouteService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.user.getAllUsers().subscribe((res: any) => {
      this.users = res;

      const age1 = res.filter((u: any) => u.age >= 1 && u.age <= 10).length;
      const age2 = res.filter((u: any) => u.age >= 11 && u.age <= 20).length;
      const age3 = res.filter((u: any) => u.age >= 21 && u.age <= 30).length;
      const age4 = res.filter((u: any) => u.age >= 31 && u.age <= 40).length;
      const age5 = res.filter((u: any) => u.age >= 41 && u.age <= 50).length;
      const age6 = res.filter((u: any) => u.age >= 51 && u.age <= 60).length;
      const age7 = res.filter((u: any) => u.age >= 61 && u.age <= 70).length;
      const age8 = res.filter((u: any) => u.age >= 71 && u.age <= 80).length;
      this.pieChart([age1, age2, age3, age4, age5, age6, age7, age8]);
    });

    this.store.getAllStores().subscribe((res: any) => {
      this.stores = res;
    });

    this.promo.getAllPromos().subscribe((res: any) => {
      this.promos = res;
    });

    this.event.getAllEvents().subscribe((res: any) => {
      this.events = res;
    });

    this.route.getAllRoutes().subscribe((res: any) => {
      this.routes = res;
      this.prepareRouteData();
    });
  }

  getUserNumber() {
    return this.users.length;
  }

  getStoreNumber() {
    return this.stores.length;
  }

  getPromoNumber() {
    return this.promos.length;
  }

  getEventNumber() {
    return this.events.length;
  }

  logout() {
    this.auth.signout();
    this.toast.success({
      detail: 'SUCCESS',
      summary: 'Log out successfully',
      duration: 5000,
    });
  }

  prepareRouteData() {
    const routeCounts: { [key: string]: number } = this.routes.reduce(
      (
        acc: { [key: string]: number },
        route: { endRoute: string; count: number }
      ) => {
        const endRoute = route.endRoute;
        if (!acc[endRoute]) {
          acc[endRoute] = 0;
        }
        acc[endRoute] += route.count;
        return acc;
      },
      {}
    );

    const sortedRoutes = Object.entries(routeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sortedRoutes.map((route) => route[0]);
    const data = sortedRoutes.map((route) => route[1]);

    this.barChart(labels, data);
  }

  barChart(labels: string[], data: number[]) {
    this.barInfo = new Chart('barCanvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of destinations',
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Top 5 Popular Stores',
            font: {
              size: 15,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  pieChart(data: number[]) {
    this.pieInfo = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: [
          '1-10',
          '10-20',
          '21-30',
          '31-40',
          '41-50',
          '51-60',
          '61-70',
          '71-80',
        ],
        datasets: [
          {
            label: 'Number of users',
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Age Distribution of Users',
            font: {
              size: 15,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

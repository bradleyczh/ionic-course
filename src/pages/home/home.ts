import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  promotionErrMsg: string;
  leaderErrMsg: string;

  constructor(
    public navCtrl: NavController,
    private dishservice: DishProvider,
    private promotionservice: PromotionProvider,
    private leaderservice: LeaderProvider,
    @Inject('BaseURL') private BaseURL
  ) {  }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(
        dish => this.dish = dish,
        err => this.dishErrMsg = <any>err
      );
    this.promotionservice.getFeaturedPromotion()
      .subscribe(
        promotion => this.promotion = promotion,
        err => this.promotionErrMsg = <any>err
      );
    this.leaderservice.getFeaturedLeader()
      .subscribe(
        leader => this.leader = leader,
        err => this.leaderErrMsg = <any>err
      );

  }

}

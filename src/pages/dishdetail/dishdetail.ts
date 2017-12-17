import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,
  ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMsg: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionsheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private localNotifications: LocalNotifications,
    @Inject('BaseURL') private BaseURL,
  ) {
      this.dish = navParams.get('dish');
      this.favorite = favoriteservice.isFavorite(this.dish.id);
      this.numcomments = this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment  => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }

  openComment() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss(data => {
      if(data) {
        this.dish.comments.push(data);
        this.numcomments++;
        let total = 0;
        this.dish.comments.forEach(comment  => total += comment.rating);
        this.avgstars = (total/this.numcomments).toFixed(2);
      }
      else return false; //prevents error if data is null
    });
    modal.present();
  }

  selectActions() {
    console.log('More actions...');

    let actionsheet = this.actionsheetCtrl.create({
      title: "Select Actions",
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => this.addToFavorites()
        },
        {
          text: 'Add Comment',
          handler: () => this.openComment()
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image,
              '', )
            .then(() =>
              this.localNotifications.schedule({text: 'Shared dish to Facebook successfully!'}))
            .catch(() =>
              console.log('Failed to post to Facebook!'))
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image,
              '', )
            .then(() =>
              this.localNotifications.schedule({text: 'Tweeted new dish successfully!'}))
            .catch(() =>
              console.log('Failed to post to Facebook!'))
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => console.log('Actions cancelled')
        },
      ]
    });
    actionsheet.present();
  }



}

Rails.application.routes.draw do

  resources :check_ins
  root 'pages#index'
  devise_for :users
  resources :users
  resources :beers

  get 'about' => 'pages#about'
  get 'contact' => 'pages#contact'
end

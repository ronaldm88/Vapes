Rails.application.routes.draw do

  root 'pages#index'
  devise_for :users
  resources :users
  resources :beers

  get 'about' => 'pages#about'
  get 'contact' => 'pages#contact'
end

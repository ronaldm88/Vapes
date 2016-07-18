Rails.application.routes.draw do
  root 'pages#index'
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
  resources :check_ins, only: [:index]
  resources :beers

  resources :users do
    resources :check_ins
  end
  get 'feed' => 'pages#feed'
  get 'about' => 'pages#about'
  get 'contact' => 'pages#contact'
end

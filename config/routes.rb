Rails.application.routes.draw do
 root :to => "site#site"
 get "map", to: 'site#map'
 
 # resources :users
 resource :session
 
 namespace :api, defaults: { format: :json } do
   resources :meals
   resources :users
   resources :guest_meal_joins
   resources :ratings
 end
end

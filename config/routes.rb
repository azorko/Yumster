Rails.application.routes.draw do
 root :to => "site#site"
 
 resources :users
 resource :session
 
 namespace :api, defaults: { format: :json } do
   resources :meals
 end
end

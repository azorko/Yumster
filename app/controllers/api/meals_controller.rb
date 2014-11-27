class Api::MealsController < Api::ApiController
  
  # def create
  #   @meal = current_user.meals.new(meal_params)
  #
  #   if @meal.save
  #     render json: @meal
  #   else
  #     render json: @meal.errors.full_messages, status: :unprocessable_entity
  #   end
  # end
  #
  # def destroy
  #   @meal = current_user.meals.find(params[:id])
  #   @meal.try(:destroy)
  #   render json: {}
  # end
  #
  def index
    #will want to sort by tag, price, date, guests, location
    params[:price] ||= 50000
    # params[:start_date] ||= "2000-01-01"
    # params[:end_date] ||= "2020-01-01"
    # params[:tag] = [params[:tag]] || ["Asian", "European", "Indian", "American", "Seafood", "Fusion"]
    
    @meals = Meal.where([ "price <= :price and date between :start_date and :end_date and tag in :tag and max_guests >= :guest_num",
      {price: params[:price], start_date: params[:start_date], end_date: params[:end_date], tag: params[:tag], guest_num: params[:guest_num]} ]);
    render json: @meals
  end
  #
  # def show
  #   @meal = Meal.includes(:members, lists: :cards).find(params[:id])
  #
  #   if @meal.is_member?(current_user)
  #     render :show
  #   else
  #     render json: ["You aren't a member of this meal"], status: 403
  #   end
  # end
  #
  # private
  #
  # def meal_params
  #   params.require(:meal).permit(:title)
  # end
  #
end

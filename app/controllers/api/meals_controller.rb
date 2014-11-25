class Api::MealsController < ApiController
  
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
    @meals = Meal.all
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

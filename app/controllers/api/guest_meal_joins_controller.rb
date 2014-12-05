class Api::GuestMealJoinsController < ApplicationController
  
  def index
    @guest_meals = GuestMealJoin.all
    render json: @guest_meals
  end
  
  def show
    @guest_meal = GuestMealJoin.find(params[:id])
    render json: @guest_meal
  end
  
  def create
    @guest_meal = GuestMealJoin.new(guest_meal_params)

    if @guest_meal.save
      render json: @guest_meal
    else
      render json: @guest_meal.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    @guest_meal = GuestMealJoin.find(params[:id])
    @guest_meal.destroy if @guest_meal
    render :json => {}
  end
  
  private

  def guest_meal_params
    params.require(:guest_meal_join).permit(:guest_id, :meal_id, :guest_num)
  end
  
end

class Api::RatingsController < ApplicationController
  
  def create
    @rating = Rating.new(rating_params)
    if @rating.save
      render json: @rating
    else
      render json: @rating.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def index
    @ratings = Rating.all
    render json: @ratings
  end
  
  private

  def rating_params
    params.require(:rating).permit(:stars, :review, :author_id, :host_id)
  end
  
end

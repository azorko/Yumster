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
    # paginates_per 4
 #    @ratings = @ratings.page(params[:page])
 #    render :json => {
 #              models: @ratings,
 #              page_number: params[:page],
 #              total_pages: @ratings.total_pages
 #            }
    render json: @ratings
  end
  
  private

  def rating_params
    params.require(:rating).permit(:stars, :review, :author_id, :host_id)
  end
  
end

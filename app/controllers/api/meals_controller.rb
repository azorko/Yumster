class Api::MealsController < Api::ApiController
  def index
    # @meals.includes(:users)
    filter_params[:top_left] ||= [37.82809893199069, -122.51091101391603]
    filter_params[:bottom_right] ||= [37.72172180283414, -122.327919986084]
    filter_params[:max_price] ||= 50000
    filter_params[:min_price] ||= 0
    filter_params[:start_date] = "2000-01-01" if (!filter_params[:start_date] ||filter_params[:start_date] == "")
    filter_params[:end_date] = "2020-01-01" if (!filter_params[:end_date] || filter_params[:end_date] == "")
    filter_params[:tag] ||= ["Asian", "Western", "Middle Eastern", "Latin American"]
    filter_params[:guest_num] ||= 1
    # if filter_params[:top_left] && filter_params[:bottom_right]
    @meals = Meal.joins("LEFT OUTER JOIN users ON meals.host_id = users.id").where([ "price between :min_price and :max_price and date between :start_date and :end_date and tag in (:tag) and max_guests >= :guest_num and lat between :bottom_right_lat and :top_left_lat and lng between :top_left_lng and :bottom_right_lng",
      {max_price: filter_params[:max_price], min_price: filter_params[:min_price], start_date: filter_params[:start_date], end_date: filter_params[:end_date], tag: filter_params[:tag], guest_num: filter_params[:guest_num], bottom_right_lat: filter_params[:bottom_right][0], top_left_lat: filter_params[:top_left][0], top_left_lng: filter_params[:top_left][1], bottom_right_lng: filter_params[:bottom_right][1] } ]).page(params[:page].to_i)
    render :index_pages, locals: {
              models: @meals, 
              page_number: params[:page].to_i || 1,
              total_pages: @meals.total_pages
            }
            
    # else
    #   filter_params[:radius] ||= 15 #in miles
    #   filter_params[:lat] ||= 37.7749295
    #   filter_params[:lng] ||= -122.41941550000001
    #   @meals = Meal.where([ "price between :min_price and :max_price and date between :start_date and :end_date and tag in (:tag) and max_guests >= :guest_num",
    #     {max_price: filter_params[:max_price], min_price: filter_params[:min_price], start_date: filter_params[:start_date], end_date: filter_params[:end_date], tag: filter_params[:tag], guest_num: filter_params[:guest_num]} ]);
    #   @meals = @meals.select do |meal|
    #     center = [filter_params[:lat].to_f, filter_params[:lng].to_f]
    #     distance(center, [meal.user.lat.to_f, meal.user.lng.to_f] ) <= filter_params[:radius] * 1609
    #   end
    #   render :index
    # end
    
  end
  
  def filter_params
    params[:filters] ||= {}
  end
  
  #distance between 2 points, for filtering based on radius and center location
  def distance (a, b)
    rad_per_deg = Math::PI/180  # PI / 180
    rkm = 6371                  # Earth radius in kilometers
    rm = rkm * 1000             # Radius in meters

    dlon_rad = (b[1]-a[1]) * rad_per_deg  # Delta, converted to rad
    dlat_rad = (b[0]-a[0]) * rad_per_deg

    lat1_rad, lon1_rad = a.map! {|i| i * rad_per_deg }
    lat2_rad, lon2_rad = b.map! {|i| i * rad_per_deg }

    a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

    rm * c # Delta in meters
  end
  
  def show
    @meal = Meal.includes(:guests => :guest_meal_joins, :user => {:ratings => :author}).find(params[:id])
        # @meal = Meal.find(params[:id])
    render :show
  end
  
  def update
    @meal = Meal.find(params[:id])
    if @meal.update_attributes(meal_params)
      render :json => @meal
    else
      render :json => @meal.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @meal = Meal.find(params[:id])
    @meal.destroy if @meal
    render :json => {}
  end
  
  def create
    @meal = current_user.host_meals.new(meal_params)
    if @meal.save
      render json: @meal
    else
      render json: @meal.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def meal_params
    params.require(:meal).permit(:title, :about, :tag, :price, :max_guests, :date, :photo_url)
  end
  
end

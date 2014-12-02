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
    params[:radius] ||= 15 #in miles
    params[:lat] ||= 37.726666666
    params[:lng] ||= -122.395555555
    params[:max_price] ||= 50000
    params[:min_price] ||= 0
    params[:start_date] = "2000-01-01" if (!params[:start_date] ||params[:start_date] == "")
    params[:end_date] = "2020-01-01" if (!params[:end_date] || params[:end_date] == "")
    params[:tag] ||= ["Asian", "Western", "Middle Eastern", "Latin American"]
    params[:guest_num] ||= 1;
    @meals = Meal.where([ "price between :min_price and :max_price and date between :start_date and :end_date and tag in (:tag) and max_guests >= :guest_num",
      {max_price: params[:max_price], min_price: params[:min_price], start_date: params[:start_date], end_date: params[:end_date], tag: params[:tag], guest_num: params[:guest_num]} ]);
    @meals = @meals.select do |meal|
      center = [params[:lat].to_f, params[:lng].to_f]
      distance(center, [meal.user.lat.to_f, meal.user.lng.to_f] ) <= params[:radius] * 1609 #convert mile radius to meters
    end
    render :index
  end
  
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
    @meal = Meal.find(params[:id])
    render :show
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

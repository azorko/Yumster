class Api::MealsController < Api::ApiController
  def index
    # params[:radius] ||= 15 #in miles
    # debugger
    filter_params[:max_price] ||= 50000
    filter_params[:min_price] ||= 0
    filter_params[:start_date] = "2000-01-01" if (!filter_params[:start_date] ||filter_params[:start_date] == "")
    filter_params[:end_date] = "2020-01-01" if (!filter_params[:end_date] || filter_params[:end_date] == "")
    filter_params[:tag] ||= ["Asian", "Western", "Middle Eastern", "Latin American"]
    filter_params[:guest_num] ||= 1;
    @meals = Meal.joins("LEFT OUTER JOIN users ON meals.host_id = users.id").where([ "price between :min_price and :max_price and date between :start_date and :end_date and tag in (:tag) and max_guests >= :guest_num and lat between :bottom_right_lat and :top_left_lat and lng between :top_left_lng and :bottom_right_lng",
      {max_price: filter_params[:max_price], min_price: filter_params[:min_price], start_date: filter_params[:start_date], end_date: filter_params[:end_date], tag: filter_params[:tag], guest_num: filter_params[:guest_num], bottom_right_lat: filter_params[:bottom_right][0], top_left_lat: filter_params[:top_left][0], top_left_lng: filter_params[:top_left][1], bottom_right_lng: filter_params[:bottom_right][1] } ]).page(params[:page].to_i);
    # if filter_params[:top_left] && filter_params[:bottom_right]
    #   @meals = @meals.select do |meal|
    #     lat = meal.user.lat.to_f
    #     lng = meal.user.lng.to_f
    #     lat < filter_params[:top_left][0].to_f && lat > filter_params[:bottom_right][0].to_f && lng > filter_params[:top_left][1].to_f && lng < filter_params[:bottom_right][1].to_f
    #     # center = [params[:lat].to_f, params[:lng].to_f]
    #     # distance(center, [meal.user.lat.to_f, meal.user.lng.to_f] ) <= params[:radius] * 1609 #convert mile radius to meters
    #   end
    # end
    # debugger
    # @meals = Meal.page(params[:page].to_i) #this is what is creating a new query, how to do this without?
    render :index, locals: { #can I do this, or do I need to use json somehow?
              models: @meals,
              page_number: params[:page].to_i || 1,
              total_pages: @meals.total_pages
            }
    # debugger
    # render :index
  end
  
  def filter_params
    params[:filters] ||= {}
  end
  #distance between 2 points, for filtering based on radius and center location
  # def distance (a, b)
 #    rad_per_deg = Math::PI/180  # PI / 180
 #    rkm = 6371                  # Earth radius in kilometers
 #    rm = rkm * 1000             # Radius in meters
 #
 #    dlon_rad = (b[1]-a[1]) * rad_per_deg  # Delta, converted to rad
 #    dlat_rad = (b[0]-a[0]) * rad_per_deg
 #
 #    lat1_rad, lon1_rad = a.map! {|i| i * rad_per_deg }
 #    lat2_rad, lon2_rad = b.map! {|i| i * rad_per_deg }
 #
 #    a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
 #    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
 #
 #    rm * c # Delta in meters
 #  end
  
  def show
    @meal = Meal.find(params[:id])
    render :show
  end
end

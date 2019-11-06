class CommonController < ApplicationController

  def index
    @models = model.all
  end

  def new
    @model = model.new
    render_if_json
  end

  def create
    create_model = model.create(params_model)
    params[:typeAction] == "json" ? render_json_success(create_model) : redirect_to_index
  end

  def show
    @model = find_model
  end

  def edit
    @model = find_model
    render_if_json
  end

  def update
    find_model.update(params_model)
    params[:typeAction] == "json" ? render_json_success(find_model) : redirect_to_index
  end

  def remove
    find_model.destroy
    redirect_to_index
  end

  private

  def redirect_to_index
    redirect_to "/#{model.first_url}"
  end

  def render_if_json
    if params[:typeAction] == "json"
      html_form = render_to_string "/#{@model.class.first_url}/_form", :layout => false, :locals => {:current_user => current_user}
      render text: html_form
    end
  end

  def render_json_success(model=nil, jq_sript=nil)
    render json: {success: true, model: model.as_json, jq: jq_sript}
  end

  def find_model
    begin 
      model.find(params[:id])
    rescue
      redirect_404
    end
  end

  def redirect_404
    redirect_to "/404"
  end

  def params_model
    params.require(model.first_url.to_sym).permit(model.column_names).compact rescue {}
  end
end

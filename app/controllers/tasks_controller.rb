class TasksController < CommonController
  def index
    @tasks = Task.all
    
    # Filter
    @tasks = @tasks.where(status: params[:status]) if params[:status].present? && params[:status] != "all"
    @tasks = @tasks.where(user_id: params[:from]) if params[:from].present? && params[:from] != "all"
    @tasks = @tasks.where(["deadline <= ?", Time.parse(params[:deadline])]) if params[:deadline].present? && params[:deadline] != ""
    # =======
    
    @tasks = @tasks.where(user_id: current_user.id) if params[:type] == "to_me"
    @tasks = @tasks.where(creater_id: current_user.id) if params[:type] == "from_me"
    if params[:typeAction] == "load_content"
      html_form = render_to_string "/tasks/index", :layout => false, :locals => {:current_company => 1}
      render plain: html_form
    end
    if params[:typeAction] == "json_load_content"
      render json: @tasks.as_json
    end
  end

  def to_me
    render plain: "text"
  end

  def from_me
    render plain: "text"
  end

  private

  def model
    Task
  end
end
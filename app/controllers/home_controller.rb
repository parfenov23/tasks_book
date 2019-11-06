class HomeController < CommonController
  def index
    # render plain:  current_user
    if params[:typeAction] == "load_content"
      html_form = render_to_string "/home/index", :layout => false, :locals => {:current_company => 1}
      render text: html_form
    end
  end
end
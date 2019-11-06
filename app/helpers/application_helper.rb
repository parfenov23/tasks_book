module ApplicationHelper
  def default_ava_link
    '/uploads/ava.jpg'
  end

  def user_ava(avatar)
    if avatar.to_s != ""
      "data:image/png;base64," + avatar
    else
      default_ava_link
    end
  end

  def layout_title
    "#{curr_title_admin_header} | Tasks Book"
  end

  def title(page_title=nil)
    @page_title = page_title
  end

  def page_title(default_title = '')
    @page_title || default_title
  end

  def curr_title_admin_header(add_title=nil)
    curr_title = nil
    all_navs_admin.each{|nav| curr_title = nav[:title] if nav[:url] == request.env["PATH_INFO"] }
    "#{add_title}#{curr_title}"
  end

  def all_navs_admin
    [ 
      {url: "/", title: "Главная", add_class:"js__load_content"},
      {url: "/tasks", title: "Все задачи", add_class:"js__load_content"},
      {url: "/tasks/to_me", title: "Мои задачи", add_class:"js__load_content"},
      {url: "/tasks/from_me", title: "Задачи от меня", add_class:"js__load_content"},
      {url: '/users/edit', title: 'Редактирование профиля', display: false}, 
    ]
  end

  def all_nav_li_admin
    all_navs = all_navs_admin 
    # if current_user.is_admin?
    #   all_navs
    # elsif current_user.is_manager?
    #   aviable_page = ["admin", "sales", "stock", "order_requests", "contacts", "admin/search"]
    #   all_navs.map{|nav| nav if aviable_page.include?(nav[:url].gsub("/admin/", ""))}.compact
    # end
    
  end
end

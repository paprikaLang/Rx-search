import { formatRepoSizeAndUnit } from './helper';

export const reposTemplate = (repos) => {
	const {owner} = repos;
	return `
      <div class="repos_item">
        <div class="repos_item_wrapper">
          <div class="repos_user_container">
            <div class="user_header_container">
              <img data-api="${owner.url}" class="user_header" src="${owner.avatar_url}"/>
              <div class="user_infos_container">
                <div class="user_infos_wrapper">
                  <div class="info_loading">
                    <i aria-hidden="true" class="fa fa-spinner fa-spin"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="user_info">
              <a class="user_link" target="_blank" href="${owner.html_url}">
                ${owner.login}
              </a>/
              <a class="repos_link" target="_blank" href="${repos.html_url}">
            ${repos.name}
          </a>
        </div>
      </div>
      <div class="repos_info_container">
        <div class="repos_desc">
          ${repos.description}
        </div>
        <div class="repos_info">
          <em class="repos_language">${repos.language || ''}</em>
          <i aria-hidden="true" class="fa fa-star"></i>&nbsp;${repos.stargazers_count}&nbsp;&nbsp;
          <i aria-hidden="true" class="fa fa-eye"></i>&nbsp;${repos.watchers_count}&nbsp;&nbsp;
          <i aria-hidden="true" class="fa fa-code-fork"></i>&nbsp;${repos.forks_count}&nbsp;&nbsp;
          <i aria-hidden="true" class="fa fa-file-archive-o"></i>&nbsp;${formatRepoSizeAndUnit(repos.size).join(' ')}
        </div>
      </div>
    </div>
  </div>`
};
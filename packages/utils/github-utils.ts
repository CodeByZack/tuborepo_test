import { Octokit } from 'octokit';

const OWNER = 'CodeByZack';
const REPO = 'blog';

let octokitInstance: Octokit | null = null;

const init = (token = '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') => {
  if (!octokitInstance) {
    octokitInstance = new Octokit({ auth: token });
  }
  return octokitInstance;
};

const getRepo = async () => {
  if (!octokitInstance) return null;
  const repo = await octokitInstance.rest.repos.get({
    owner: OWNER,
    repo: REPO,
  });
  console.log({ repo });
};

const getRepoFile = async (path: string) => {
  if (!octokitInstance) return null;
  const repo = await octokitInstance.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path,
  });
  const decodeTxt = decodeURIComponent(escape(atob(repo.data.content)));
  return { content: decodeTxt, sha: repo.data.sha, path: repo.data.path };
};

const updateRepoFile = async (updateObj: any) => {
  if (!octokitInstance) return null;

  const { path, content, sha } = updateObj;
  console.log(updateObj);
  const encodeTxt = btoa(unescape(encodeURIComponent(content)));
  const params = {
    owner: OWNER,
    repo: REPO,
    path: path,
    sha: sha,
    content: encodeTxt,
    message: `modify ${path} by ${OWNER} at ${new Date().toLocaleString()}`,
  };

  const res = await octokitInstance.rest.repos.createOrUpdateFileContents(
    params,
  );
};

const repoUtil = {
  init,
  getRepoFile,
  updateRepoFile,
  getRepo
};

export default repoUtil;

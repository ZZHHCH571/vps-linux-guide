import type { Lesson } from '../types';
import { what_is_vps } from './what-is-vps';
import { vps_buy_guide } from './vps-buy-guide';
import { linux_basics } from './linux-basics';
import { vps_select } from './vps-select';
import { ssh_basic } from './ssh-basic';
import { port } from './port';
import { firewall } from './firewall';
import { ssh } from './ssh';
import { root } from './root';
import { security } from './security';
import { packages } from './packages';
import { webserver } from './webserver';
import { database } from './database';
import { monitor } from './monitor';
import { file_permissions } from './file-permissions';
import { process_management } from './process-management';
import { backup } from './backup';
import { dns } from './dns';
import { http_https } from './http-https';
import { domain_binding } from './domain-binding';
import { vim_nano } from './vim-nano';
import { crontab } from './crontab';
import { systemd } from './systemd';
import { network_troubleshoot } from './network-troubleshoot';
import { disk_space } from './disk-space';
import { cpu_memory } from './cpu-memory';

export const lessons: Lesson[] = [
  what_is_vps,
  vps_buy_guide,
  linux_basics,
  vps_select,
  ssh_basic,
  port,
  firewall,
  ssh,
  root,
  security,
  packages,
  webserver,
  database,
  monitor,
  file_permissions,
  process_management,
  backup,
  dns,
  http_https,
  domain_binding,
  vim_nano,
  crontab,
  systemd,
  network_troubleshoot,
  disk_space,
  cpu_memory,
];

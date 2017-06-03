package com.wdkj.wf.service.daily.impl;

import com.wdkj.wf.house.entity.DailyEntity;

public interface  DailyService {
/**写日报
 * @throws Exception
 */
void savedaily(DailyEntity parms)throws Exception;
}

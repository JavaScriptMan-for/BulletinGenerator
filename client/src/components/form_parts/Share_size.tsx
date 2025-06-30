import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSelector } from 'react-redux';
import { RootState } from '@slices-my/store';

import { Share } from '@types-my/Form.type';

interface Props {
  fraction: 'в доле' | 'га';
}

const ShareSize: FC<Props> = ({ fraction }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Share>();

  const general_info = useSelector((state: RootState) => state.general_info.general_info);


  return (
    <div id="share">
      <div className="line">
        <label>Размер доли в праве</label>
        <input
          className="share_size"
          placeholder={fraction === 'в доле' ? '144' : '10'}
          type="number"
          {...register('share_size_ch', {
            required: 'Это поле обязательное',
            min: {
              value: 0,
              message: 'Слишком малое значение',
            },
            max: {
              value: 999999,
              message: "Слишком большое значение"
            }
          })}
        />
        {fraction === 'в доле' && (
          <>
            <span id='slash'>/</span>
            <input
              type="number"
              className="share_size"
              placeholder="256"
              {...register('share_size_z', {
                required: 'Это поле обязательное',
                min: {
                  value: 1,
                  message: 'Слишком малый знаменатель',
                },
                    max: {
              value: 999999,
              message: "Слишком большой знаменатель"
            }
              })}
            />
          </>
        )}
        {general_info.isShareWithCommon == 'true' && (
          <>
            <label>Размер доли с общим знаменателем</label>
            <input
              className="share_size"
              type="text"
              placeholder="288"
              {...register('share_size_with_common_ch', {
                required: 'Это поле обязательное',
                min: {
                  value: 1,
                  message: 'Слишком малый числитель',
                },
                    max: {
              value: 999999,
              message: "Слишком большое значение"
            }
              })}
            />
            <span>/</span>
            <input
              className="share_size"
              type="text"
              placeholder="512"
              {...register('share_size_with_common_z', {
                required: 'Это поле обязательное',
                min: {
                  value: 1,
                  message: 'Слишком малый знаменатель',
                },
                    max: {
              value: 999999,
              message: "Слишком большое значение"
            }
              })}
            />
          </>
        )}
      </div>
      <div className="validate_errors">
        <p className="validate_error">{errors.share_size_ch && errors.share_size_ch.message}</p>
        <p className="validate_error">{errors.share_size_z && errors.share_size_z.message}</p>
        <p className="validate_error">{errors.share_size_with_common_ch && errors.share_size_with_common_ch.message}</p>
        <p className="validate_error">{errors.share_size_with_common_z && errors.share_size_with_common_z.message}</p>
      </div>
    </div>
  );
};

export default ShareSize;

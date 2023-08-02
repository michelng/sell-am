package com.mngsolution.sellam.service.impl;

import com.mngsolution.sellam.domain.RoleEmploye;
import com.mngsolution.sellam.repository.RoleEmployeRepository;
import com.mngsolution.sellam.service.RoleEmployeService;
import com.mngsolution.sellam.service.dto.RoleEmployeDTO;
import com.mngsolution.sellam.service.mapper.RoleEmployeMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link RoleEmploye}.
 */
@Service
@Transactional
public class RoleEmployeServiceImpl implements RoleEmployeService {

    private final Logger log = LoggerFactory.getLogger(RoleEmployeServiceImpl.class);

    private final RoleEmployeRepository roleEmployeRepository;

    private final RoleEmployeMapper roleEmployeMapper;

    public RoleEmployeServiceImpl(RoleEmployeRepository roleEmployeRepository, RoleEmployeMapper roleEmployeMapper) {
        this.roleEmployeRepository = roleEmployeRepository;
        this.roleEmployeMapper = roleEmployeMapper;
    }

    @Override
    public RoleEmployeDTO save(RoleEmployeDTO roleEmployeDTO) {
        log.debug("Request to save RoleEmploye : {}", roleEmployeDTO);
        RoleEmploye roleEmploye = roleEmployeMapper.toEntity(roleEmployeDTO);
        roleEmploye = roleEmployeRepository.save(roleEmploye);
        return roleEmployeMapper.toDto(roleEmploye);
    }

    @Override
    public RoleEmployeDTO update(RoleEmployeDTO roleEmployeDTO) {
        log.debug("Request to update RoleEmploye : {}", roleEmployeDTO);
        RoleEmploye roleEmploye = roleEmployeMapper.toEntity(roleEmployeDTO);
        roleEmploye = roleEmployeRepository.save(roleEmploye);
        return roleEmployeMapper.toDto(roleEmploye);
    }

    @Override
    public Optional<RoleEmployeDTO> partialUpdate(RoleEmployeDTO roleEmployeDTO) {
        log.debug("Request to partially update RoleEmploye : {}", roleEmployeDTO);

        return roleEmployeRepository
            .findById(roleEmployeDTO.getId())
            .map(existingRoleEmploye -> {
                roleEmployeMapper.partialUpdate(existingRoleEmploye, roleEmployeDTO);

                return existingRoleEmploye;
            })
            .map(roleEmployeRepository::save)
            .map(roleEmployeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoleEmployeDTO> findAll() {
        log.debug("Request to get all RoleEmployes");
        return roleEmployeRepository.findAll().stream().map(roleEmployeMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RoleEmployeDTO> findOne(Long id) {
        log.debug("Request to get RoleEmploye : {}", id);
        return roleEmployeRepository.findById(id).map(roleEmployeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete RoleEmploye : {}", id);
        roleEmployeRepository.deleteById(id);
    }
}
